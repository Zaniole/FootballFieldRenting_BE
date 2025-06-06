const axios = require("axios").default;
const CryptoJS = require("crypto-js");
const moment = require("moment");
const Payment = require("../models/payment.model");
const Booking = require("../models/booking.model");
const qs = require('qs');
const ZaloPayment = require("../models/zalopayment.model");
const { matchingOpponent } = require("./booking.service");
require("dotenv").config();

const config = {
	app_id: process.env.ZALOPAY_APP_ID,
	key1: process.env.ZALOPAY_KEY1,
	key2: process.env.ZALOPAY_KEY2,
	endpoint: "https://sb-openapi.zalopay.vn/v2/create",
	refund_url: 'https://sb-openapi.zalopay.vn/v2/refund',
	query_refund_url: 'https://sb-openapi.zalopay.vn/v2/query_refund'
};

const createTransaction = async (user, amount, payment, isFindingOpponentType) => {
	try {
		const transID = Math.floor(Math.random() * 1000000);
		const appTransId = `${moment().format("YYMMDD")}_${transID}`;
		const embed_data = {
			redirecturl: `http://localhost:3000/booking-zalopay?payment_id=${payment}&is_finding_opponent=${isFindingOpponentType}`,
			paymentId: payment,
			isFindingOpponent: isFindingOpponentType
		};
		const items = [{}];

		const order = {
			app_id: config.app_id,
			app_trans_id: appTransId,
			app_user: user,
			app_time: Date.now(),
			item: JSON.stringify(items),
			embed_data: JSON.stringify(embed_data),
			amount: amount,
			description: "Thanh toán qua Zalopay",
			bank_code: "",
			callback_url: "https://76c7-183-80-250-38.ngrok-free.app/api/payment/zalopay/callback"
		};

		// Generate MAC
		const data =
			config.app_id +
			"|" +
			order.app_trans_id +
			"|" +
			order.app_user +
			"|" +
			order.amount +
			"|" +
			order.app_time +
			"|" +
			order.embed_data +
			"|" +
			order.item;
		order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

		// Call Zalopay API
		const response = await axios.post(config.endpoint, null, { params: order });

		// Trả về thêm app_trans_id
		return { ...response.data, app_trans_id: appTransId, user: user };
	} catch (error) {
		console.error("Error creating transaction:", error);
		throw error;
	}
};

const handleCallback = async (data, reqMac) => {
	let result = {};

	try {
		let dataStr = data;

		let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
		console.log("mac =", mac);


		// kiểm tra callback hợp lệ (đến từ ZaloPay server)
		if (reqMac !== mac) {
			// callback không hợp lệ
			result.return_code = -1;
			result.return_message = "mac not equal";
		}
		else {
			// thanh toán thành công
			// merchant cập nhật trạng thái cho đơn hàng
			let dataJson = JSON.parse(dataStr);
			const embedData = JSON.parse(dataJson.embed_data);
			const paymentId = embedData.paymentId;
			console.log('embedData', embedData)
			const isFindingOpponent = embedData.isFindingOpponent;
			console.log('isFindingOpponentType', isFindingOpponent)

			//Kiểm tra nếu mục đích thanh toán là đặt sân hay ghép đối
			if (!isFindingOpponent) {
				//update payment status
				await Payment.findByIdAndUpdate(paymentId, { status: 'completed' })

				//update booking status
				const payment = await Payment.findById(paymentId)
				const bookingId = payment.booking;
				await Booking.findByIdAndUpdate(bookingId, { status: 'paid' })

				//create and save new ZaloPayment
				const { zp_trans_id, amount, app_user } = dataJson;
				await ZaloPayment.create({
					zp_trans_id: zp_trans_id,
					payment: paymentId,
					amount: amount,
					paymentType: 'booking',
					payer: app_user
				})
			} else {
				const payment = await Payment.findById(paymentId)
				const bookingId = payment.booking;
				const user = dataJson.app_user;
				//update booking
				await matchingOpponent(bookingId, user);

				//create and save new Zalopayment
				const { zp_trans_id, amount } = dataJson;
				await ZaloPayment.create({
					zp_trans_id: zp_trans_id,
					payment: paymentId,
					amount: amount,
					paymentType: 'matchingOpponent',
					payer: user
				})
			}

			result.return_code = 1;
			result.return_message = "success";

		}
	} catch (ex) {
		result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
		result.return_message = ex.message;
	}

	// thông báo kết quả cho ZaloPay server
	console.log(result)
	return result;
}

const refund = async (zalopayId, amount) => {
	try {
		const timestamp = Date.now();
		const uid = `${timestamp}${Math.floor(111 + Math.random() * 999)}`;

		const order = {
			app_id: config.app_id,
			m_refund_id: `${moment().format('YYMMDD')}_${config.app_id}_${uid}`,
			timestamp,
			zp_trans_id: zalopayId,
			amount,
			description: 'Refund when finding opponent successfully'
		}

		const data = order.app_id + "|" + order.zp_trans_id + "|" + order.amount + "|" + order.description + "|" + order.timestamp;
		order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
		console.log(order)

		// Call Zalopay API
		const response = await axios.post(config.refund_url,
			qs.stringify(order), // truyền body dạng form
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			});

		// const response = axios.post(config.refund_url, null, { params: order });
		return response.data;
	} catch (error) {
		console.error("Error while refund transaction:", error);
		throw error;
	}
}

const queryRefund = async (refundId) => {
	try {
		const params = {
			app_id: config.app_id,
			timestamp: Date.now(), // miliseconds
			m_refund_id: refundId,
		};

		const data = config.app_id + "|" + params.m_refund_id + "|" + params.timestamp;
		params.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
		console.log(params)

		const response = await axios.post(config.query_refund_url,
			qs.stringify(params), // truyền body dạng form
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			});
		return response.data;
	} catch (error) {
		console.error("Error while refund transaction:", error);
		throw error;
	}
}

module.exports = {
	createTransaction,
	handleCallback,
	refund,
	queryRefund
};

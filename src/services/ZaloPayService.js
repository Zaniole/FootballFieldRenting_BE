const axios = require("axios").default;
const CryptoJS = require("crypto-js");
const moment = require("moment");
const Payment = require("../models/payment.model");
const Booking = require("../models/booking.model");
require("dotenv").config();

const config = {
	app_id: process.env.ZALOPAY_APP_ID,
	key1: process.env.ZALOPAY_KEY1,
	key2: process.env.ZALOPAY_KEY2,
	endpoint: "https://sb-openapi.zalopay.vn/v2/create",
};

const createTransaction = async (user, amount, payment) => {
	try {
		const transID = Math.floor(Math.random() * 1000000);
		const appTransId = `${moment().format("YYMMDD")}_${transID}`;
		const embed_data = {
			redirecturl: `http://localhost:3000/booking-zalopay?payment_id=${payment}`,
			paymentId: payment
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
			callback_url: "https://215a-183-80-250-38.ngrok-free.app/api/payment/zalopay/callback"
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
		return { ...response.data, app_trans_id: appTransId };
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
			console.log(paymentId);
			console.log(dataJson)

			//update payment status
			await Payment.findByIdAndUpdate(paymentId, {status: 'completed'})

			//update booking status
			const payment = await Payment.findById(paymentId)
			const bookingId = payment.booking;
			await Booking.findByIdAndUpdate(bookingId, {status: 'paid'})
			
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

module.exports = { 
	createTransaction,
	handleCallback 
};

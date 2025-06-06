const PaymentService = require('../services/payment.service');
const ZaloPayService = require('../services/ZaloPayService');

const createPayment = async (req, res) => {
	try {
		const paymentData = req.body;
		console.log(req.body)
		const response = await PaymentService.createPayment(paymentData);
		return res.status(201).json(response);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

const getPaymentByBookingId = async (req, res) => {
	try {
		const bookingId = req.params.id;
		const response = await PaymentService.getPaymentByBookingId(bookingId)
		return res.status(201).json(response)
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

const updatePaymentStatus = async (req, res) => {
	try {
		const paymentId = req.params.id;
		const status = req.body.status;
		const response = await PaymentService.updatePaymentStatus(paymentId, status);
		return res.status(201).json(response);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

const cancelPayment = async (req, res) => {
	try {
		const paymentId = req.params.id;
		const response = await PaymentService.cancelPayment(paymentId);
		return res.status(201).json(response);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

const createTransactionZaloPay = async (req, res) => {
	try {
		const { user, amount, payment, isFindingOpponentType } = req.body;
		if (!amount || !user || !payment) {
			return res.status(400).json({ message: "Missing required fields!" });
		}
		const transaction = await ZaloPayService.createTransaction(user, amount, payment, isFindingOpponentType);
		return res.status(201).json(transaction);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

const handleCallback = async (req, res) => {
	try {
		const { data, mac } = req.body;
		const response = await ZaloPayService.handleCallback(data, mac)
		return res.status(201).json(response);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

const refund = async (req, res) => {
	try {
		const { zalopayId, amount } = req.body;
		console.log(zalopayId)
		console.log(amount)
		const response = await ZaloPayService.refund(zalopayId, amount)
		return res.status(201).json(response);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

const queryRefund = async (req, res) => {
	try {
		const { refundId } = req.body;
		console.log(req.body)
		const response = await ZaloPayService.queryRefund(refundId)
		return res.status(201).json(response);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

module.exports = {
	createPayment,
	updatePaymentStatus,
	cancelPayment,
	createTransactionZaloPay,
	handleCallback,
	getPaymentByBookingId,
	refund,
	queryRefund
}
const Booking = require('../models/booking.model');
const User = require('../models/user.model');
const Payment = require('../models/payment.model');

const createPayment = (paymentData) => {
	return new Promise(async (resolve, reject) => {
		try {
			const {
				bookingId,
				customerId,
				amount,
				paymentMethod,
			} = paymentData;

			const checkBooking = await Booking.findById(bookingId);
			const checkUser = await User.findById(customerId);

			if (!checkBooking || !checkUser) {
				return resolve({
					status: 'ERROR',
					message: 'User or Booking is not found'
				})
			}

			const newPayment = await Payment.create({
				booking: bookingId,
				customer: customerId,
				amount,
				paymentMethod
			})

			if (newPayment) {
				resolve({
					status: 'OK',
					message: 'Create new payment successfully',
					data: newPayment
				})
			}

		} catch (error) {
			reject(error);
		}
	})
}

const getPaymentByBookingId = (bookingId) => {
	return new Promise(async (resolve, reject) => {
		try {
			const checkBooking = await Booking.findById(bookingId);
			if (!checkBooking) {
				return resolve({
					status: 'ERROR',
					message: 'Booking is not found'
				})
			}

			const payment = await Payment.findOne({ booking: bookingId})

			if (payment) {
				resolve({
					status: 'OK',
					message: 'Get payment successfully',
					data: payment
				})
			}
		} catch (error) {
			reject(error)
		}
	})
}

const updatePaymentStatus = (id, newStatus) => {
	return new Promise(async (resolve, reject) => {
		try {
			const checkPayment = await Payment.findById(id);
			if (!checkPayment) {
				return resolve({
					status: 'ERROR',
					message: 'Payment is not found'
				})
			}

			if (!newStatus) {
				return resolve({
					status: 'ERROR',
					message: 'Status must not be null'
				})
			}
			const updatedPayment = await Payment.findByIdAndUpdate(id, {
				status: newStatus
			}, { new: true })

			if(newStatus === 'failed'){
				const bookingId = updatedPayment.booking;
				await Booking.findByIdAndUpdate(bookingId, {
					status: 'cancelled'
				}) 
			}

			if (updatedPayment) {
				resolve({
					status: 'OK',
					message: 'Update payment status successfully',
					data: updatedPayment
				})
			}
		} catch (error) {
			reject(error)
		}
	})
}

const cancelPayment = (paymentId) => {
	return new Promise(async (resolve, reject) => {
		try {
			const result  = await Payment.findByIdAndDelete(paymentId)
			if(result){
				resolve({
					status: 'OK',
					message: 'Delete payment successfully'
				})
			}
		} catch (error) {
			reject(error)
		}
	})
}

module.exports = {
	createPayment,
	updatePaymentStatus,
	cancelPayment,
	getPaymentByBookingId
}
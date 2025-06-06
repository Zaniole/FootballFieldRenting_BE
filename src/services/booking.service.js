const Booking = require('../models/booking.model');
const Field = require('../models/field.model');
const User = require('../models/user.model');

const getAllBooking = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const allBooking = await Booking.find().populate('customer').populate('field');

			resolve({
				status: 'OK',
				message: 'Get all booking successfully',
				data: allBooking
			})
		} catch (error) {
			reject(error);
		}
	})
}

const createBooking = (bookingData) => {
	return new Promise(async (resolve, reject) => {
		try {
			const {
				customer,
				field,
				bookingTime,
				totalPrice,
				findingOpponent,
			} = bookingData;

			const checkUser = await User.findById(customer)
			const checkField = await Field.findById(field);

			if(!checkUser || !checkField){
				return resolve({
					status: 'ERROR',
					message: 'User or field is undefined'
				})
			}

			const newBooking = await Booking.create({
				customer,
				field,
				bookingTime,
				totalPrice,
				findingOpponent,
			})

			if (newBooking) {
				resolve({
					status: 'OK',
					message: 'Create new booking successfully',
					data: newBooking
				})
			}

		} catch (error) {
			reject(error);
		}
	})
}

const getBookingById = (id) => {
	return new Promise(async (resolve, reject) => {
		try {
			const booking = await Booking.findById(id);

			resolve({
				status: 'OK',
				message: 'Get booking successfully',
				data: booking
			})
		} catch (error) {
			reject(error);
		}
	})
}

const getBookingByUserId = (userId) => {
	return new Promise(async (resolve, reject) => {
		try {
			const booking = await Booking.find({customer: userId}).populate('field');

			resolve({
				status: 'OK',
				message: 'Get booking successfully',
				data: booking
			})
		} catch (error) {
			reject(error);
		}
	})
}

const getBookingByFieldId = (fieldId) => {
	return new Promise(async (resolve, reject) => {
		try {
			const booking = await Booking.find({field: fieldId});

			resolve({
				status: 'OK',
				message: 'Get booking successfully',
				data: booking
			})
		} catch (error) {
			reject(error);
		}
	})
}

const updateBookingStatus = (bookingId, bookingData) => {
	return new Promise (async (resolve, reject) => {
		try {
			const checkBooking = await Booking.findById(bookingId);
			if(!checkBooking){
				resolve({
					status: 'ERROR',
					message: 'Booking is not found'
				})
			}

			const updatedBooking = await Booking.findByIdAndUpdate(bookingId, bookingData, {
				new: true
			})

			resolve({
				status: 'OK',
				message: 'Update booking successfully',
				data: updatedBooking
			})
		} catch (error) {
			reject(error)
		}
	})
}

const matchingOpponent = (bookingId, opponentId) => {
	return new Promise (async (resolve, reject) => {
		try {
			const checkBooking = await Booking.findById(bookingId);
			const checkUser = await User.findById(opponentId)
			if(!checkBooking){
				resolve({
					status: 'ERROR',
					message: 'Booking is not found'
				})
			}

			if(!checkUser) {
				resolve({
					status: 'ERROR',
					message: 'User is not found'
				})
			}

			const updatedBooking = await Booking.findByIdAndUpdate(bookingId, {
				findingOpponent: false,
				opponent: opponentId,
				matchStatus: 'matched'
			}, 
			{
				new: true
			})

			resolve({
				status: 'OK',
				message: 'Update booking successfully',
				data: updatedBooking
			})
		} catch (error) {
			reject(error)
		}
	})
}

module.exports = {
	getAllBooking,
	createBooking,
	getBookingById,
	getBookingByUserId,
	getBookingByFieldId,
	updateBookingStatus,
	matchingOpponent
};
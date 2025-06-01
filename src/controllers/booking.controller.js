const BookingService = require('../services/booking.service');

const getAllBooking = async (req, res) => {
	try {
		const booking = await BookingService.getAllBooking();
		return res.status(201).json(booking);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

const createBooking = async (req, res) => {
	try {
		const {
			customer,
			field,
			bookingTime,
			totalPrice,
			findingOpponent
		} = req.body;

		if (!customer || !field || !bookingTime || !totalPrice) {
			return res.status(400).json({
				status: "ERROR",
				message: "Missing information",
			});
		}
		const newBooking = await BookingService.createBooking(req.body);
		return res.status(201).json(newBooking);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

const getBookingById = async (req, res) => {
	try {
		const bookingId = req.params.id;
		const booking = await BookingService.getBookingById(bookingId);
		return res.status(201).json(booking);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

const getBookingByUserId = async (req, res) => {
	try {
		const userId = req.params.id;
		const booking = await BookingService.getBookingByUserId(userId);
		return res.status(201).json(booking);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

const getBookingByFieldId = async (req, res) => {
	try {
		const fieldId = req.params.id;
		const booking = await BookingService.getBookingByFieldId(fieldId);
		return res.status(201).json(booking);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

const updateBookingStatus = async (req, res) => {
	try {
		const bookingId = req.params.id;
		const data = req.body;
		const updatedBooking = await BookingService.updateBookingStatus(bookingId, data);
		return res.status(201).json(updatedBooking);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

const cancelBooking = async (req, res) => {
	try {
		const bookingId = req.params.id;
		const response = await BookingService.cancelBooking(bookingId);
		return res.status(201).json(response);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

module.exports = {
	getAllBooking,
	createBooking,
	getBookingById,
	getBookingByUserId,
	getBookingByFieldId,
	updateBookingStatus,
	cancelBooking
}
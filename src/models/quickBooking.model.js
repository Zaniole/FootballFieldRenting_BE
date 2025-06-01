const mongoose = require('mongoose');
const { SchemaTypes } = require('mongoose');

const quickBookingSchema = new mongoose.Schema({
	customerName: { type: String, required: true },
	field: {
		type: SchemaTypes.ObjectId,
		ref: 'Field',
		required: true
	},
	email: { type: String, required: true },
	phoneNumber: { type: String, required: true },
	bookingTime: {
		startTime: { type: Date, required: true },
		endTime: { type: Date, required: true },
	},
	totalPrice: { type: Number, required: true },
	status: {
		type: String,
		enum: ['pending', 'cancelled', 'paid'],
		default: 'pending',
		required: true
	},
	note: { type: String }
},
	{
		timestamps: true
	}
);

const QuickBooking = mongoose.model('QuickBooking', quickBookingSchema);

module.exports = QuickBooking;

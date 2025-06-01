const mongoose = require('mongoose');
const { SchemaTypes } = require('mongoose');

const bookingSchema = new mongoose.Schema({
	customer: {
		type: SchemaTypes.ObjectId,
		ref: 'User',
		required: true
	},
	field: {
		type: SchemaTypes.ObjectId,
		ref: 'Field',
		required: true
	},
	bookingTime: {
		startTime: { type: Date, required: true },
		endTime: { type: Date, required: true },
	},
	totalPrice: { type: Number, required: true },
	status: { 
		type: String, 
		enum: ['completed', 'pending', 'cancelled', 'paid', 'refunded'],
		default: 'pending', 
		required: true 
	},
	findingOpponent: { type: Boolean, default: false },
	opponent: { type: SchemaTypes.ObjectId, ref:'User' },
	matchStatus: { 
		type: String, 
		enum: ['waiting', 'matched', 'cancelled'], 
		default: 'waiting'
	}
	},
	{
		timestamps: true
	}
);

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;

const mongoose = require('mongoose');
const { SchemaTypes } = require('mongoose')

const paymentSchema = new mongoose.Schema({
	booking: {
		type: SchemaTypes.ObjectId,
		ref: 'Booking',
		require: true
	},
	customer: {
		type: SchemaTypes.ObjectId,
		ref: 'User',
		require: true
	},
	amount: {
		type: Number,
		require: true
	},
	paymentMethod: {
		type: String,
		require: true
	},
	status: {
		type: String,
		enum: ['pending', 'completed', 'failed'],
		default: 'pending',
		require: true
	}
},
	{
		timestamps: true
	})

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
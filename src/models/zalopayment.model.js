const mongoose = require('mongoose');
const { SchemaTypes } = require('mongoose')

const zaloPaymentSchema = new mongoose.Schema({
	zp_trans_id: {
		type: String,
		require: true,
		unique: true
	},
	payer: {
		type: SchemaTypes.ObjectId,
		ref: 'User',
		require: true
	},
	payment: {
		type: SchemaTypes.ObjectId,
		ref: 'Payment',
		require: true
	},
	amount: {
		type: Number,
		require: true
	},
	paymentType: {
		type: String,
		enum: ['booking', 'matchingOpponent'],
		require: true
	}
},
	{
		timestamps: true
	})

const ZaloPayment = mongoose.model('ZaloPayment', zaloPaymentSchema);

module.exports = ZaloPayment;
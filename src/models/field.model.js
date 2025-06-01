const mongoose = require('mongoose');
const { SchemaTypes } = require('mongoose');

const fieldSchema = new mongoose.Schema(
	{
		owner: {
			type: SchemaTypes.ObjectId,
			ref: "User",
			required: true
		},
		name: { type: String, required: true },
		address: { type: String, required: true },
		subField: { type: Number, required: true },
		service: [
			{
				type: SchemaTypes.ObjectId,
				ref: "FieldService",
				required: true
			}
		],
		image: { type: String, required: true },
		price: { type: Number, required: true },
		goldPrice: { type: Number, required: true },
		openTime: {
			startAt: {
				type: String,
				match: /^([01]\d|2[0-3]):([0-5]\d)$/,
				required: true
			},
			closeAt: {
				type: String,
				match: /^([01]\d|2[0-3]):([0-5]\d)$/,
				required: true
			}
		},
		description: { type: String },
		status: {
			type: String,
			enum: ['active', 'maintainance', 'closed'],
			default: 'active',
			required: true
		},
		rating: {
			type: Number,
			min: 0,
			max: 5,
			default: 0
		}
	},
	{
		timestamps: true
	});

const Field = mongoose.model('Field', fieldSchema);
module.exports = Field;
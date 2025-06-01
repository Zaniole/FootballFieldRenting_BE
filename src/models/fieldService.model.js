const mongoose = require('mongoose');
const { SchemaTypes } = require('mongoose');

const fieldServiceSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
	},
	{
		timestamps: true
	})

const FieldService = mongoose.model('FieldService', fieldServiceSchema)
module.exports = FieldService;
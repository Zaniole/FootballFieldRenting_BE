const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  fieldId: { type: Schema.Types.ObjectId, ref: 'Field', required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  isPaid: { type: Boolean, required: true},
  paidAt: { type: Date},
  status: { type: String, enum: ['confirmed', 'pending', 'canceled'], required: true }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;

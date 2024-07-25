const mongoose = require('mongoose');

const fixedTimeSlots = [
  { startTime: '07:00', endTime: '08:30' },
  { startTime: '08:30', endTime: '10:00' },
  { startTime: '10:00', endTime: '11:30' },
  { startTime: '14:00', endTime: '16:30' },
  { startTime: '16:30', endTime: '18:00' },
  { startTime: '18:00', endTime: '19:30' },
  { startTime: '19:30', endTime: '21:00' },
  { startTime: '21:00', endTime: '22:30' }
];

const fieldSchema = new Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String, required: true},
    subFieldCount: { type: Number, required: true},
    price: { type: Number, required: true },
    availability: [fixedTimeSlots],
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  });

const Field = mongoose.model('Field', fieldSchema);
module.exports = Field;
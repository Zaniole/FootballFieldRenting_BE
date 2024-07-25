const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ['customer', 'owner'], default: 'customer', required: true },
    isAdmin: { type: Boolean, default: false, require: true},
    accessToken: { type: String, require: true},
    refreshToken: { type: String, require: true}
  });

const User = mongoose.model('User', userSchema);
module.exports = User;
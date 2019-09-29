const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const schema = mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    unique: true
  },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

schema.methods.generateAuthToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
};

module.exports = mongoose.model('users', schema);

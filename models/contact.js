const mongoose = require('mongoose');

const schema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  phone: { type: String, required: true },
  type: {
    type: String,
    default: 'Personal',
    enum: ['Personal', 'Professional']
  },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('contacts', schema);

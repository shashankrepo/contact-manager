const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const { validateSignUp } = require('../validation/users');
const bcrypt = require('bcryptjs');
const _ = require('lodash');

router.post('/', async (req, res) => {
  const { error } = validateSignUp(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  try {
    const { password } = req.body;
    const user = new Users({ ...req.body });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    const token = user.generateAuthToken();
    await user.save();

    res
      .header('x-auth-token', token)
      .json({ success: true, user: _.pick(user, ['name', 'email']), token });
  } catch (error) {
    if (error.name === 'MongoError' && error.code === 11000)
      return res
        .status(400)
        .json({ success: false, message: 'Email already exists' });

    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const { validateLogin } = require('../validation/users');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const auth = require('../middleware/auth');

router.post('/', async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });

  try {
    const user = await Users.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: 'Invalid email or password' });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword)
      return res
        .status(400)
        .json({ success: false, message: 'Invalid email or password' });

    const token = user.generateAuthToken();

    res
      .header('x-auth-token', token)
      .json({ success: true, user: _.pick(user, ['name', 'email']) });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const user = await Users.findById(req.user.id).select('-password');
    res.json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;

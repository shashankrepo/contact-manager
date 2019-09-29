const express = require('express');
const router = express.Router();
const Contacts = require('../models/contact');
const auth = require('../middleware/auth');
const {
  validateContactAdd,
  validateContactUpdate
} = require('../validation/contact');

router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contacts.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json({ success: true, contacts });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

router.post('/', auth, async (req, res) => {
  const { error } = validateContactAdd(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }

  try {
    const contact = new Contacts({
      ...req.body,
      user: req.user.id
    });
    await contact.save();
    res.json({ success: true, contact });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validateContactUpdate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }

  try {
    await Contacts.findByIdAndUpdate(req.params.id, {
      $set: {
        ...req.body
      }
    });
    res.json({ success: true });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: 'Contact could not be found' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Contacts.findByIdAndRemove({ _id: req.params.id });
    res.json({ success: true });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: 'Contact could not be found' });
  }
});

module.exports = router;

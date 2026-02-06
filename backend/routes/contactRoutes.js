const express = require('express');
const router = express.Router();
const { sendContactMail, getContactMessages } = require('../controllers/contactController');
const { protect, admin } = require('../middleware/auth');

router.post('/contact', sendContactMail);
router.get('/', protect, admin, getContactMessages);

module.exports = router;

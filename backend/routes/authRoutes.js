const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.userLogin);
router.post('/signup', authController.userSignup);

module.exports = router;
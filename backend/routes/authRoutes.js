const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/user-login', authController.userLogin);
router.post('/user-signup', authController.userSignup);

module.exports = router;
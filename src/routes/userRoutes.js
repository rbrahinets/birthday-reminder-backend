const express = require('express');
const { getCurrentUser, signInUser } = require('../controllers/userController');
const validateToken = require('../middleware/validateTokenHandler');

const router = express.Router();

router.route('/current/info').get(validateToken, getCurrentUser);
router.route('/sign-in').post(signInUser);

module.exports = router;

const express = require('express');
const validateToken = require('../middlewares/validateTokenHandler');
const {
  getUsers,
  getUser,
  saveUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  getCurrentUser,
  signInUser,
} = require('../controllers/userController');

const router = express.Router();

router.route('/').get(getUsers);
router.route('/:id').get(getUser);
router.route('/').post(saveUser);
router.route('/:id').put(updateUser);
router.route('/:id').delete(deleteUser);
router.route('/current/info').get(validateToken, getCurrentUser);
router.route('/email/:email').get(getUserByEmail);
router.route('/sign-in').post(signInUser);

module.exports = router;

const express = require('express')
const {
  getUsers,
  getUser,
  saveUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  signInUser,
} = require('../controllers/userController')

const router = express.Router()

router.route('/').get(getUsers)
router.route('/:id').get(getUser)
router.route('/').post(saveUser)
router.route('/:id').put(updateUser)
router.route('/:id').delete(deleteUser)
router.route('/email/:email').get(getUserByEmail)
router.route('/sign-in').post(signInUser)

module.exports = router

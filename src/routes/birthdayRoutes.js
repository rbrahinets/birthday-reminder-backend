const express = require('express');
const {
  getBirthdays,
  getBirthday,
  saveBirthday,
  updateBirthday,
  deleteBirthday,
  getBirthdaysForUserByEmail,
} = require('../controllers/birthdayController');

const router = express.Router();

router.route('/').get(getBirthdays);
router.route('/:id').get(getBirthday);
router.route('/').post(saveBirthday);
router.route('/:id').put(updateBirthday);
router.route('/:id').delete(deleteBirthday);
router.route('/email/:email').get(getBirthdaysForUserByEmail);

module.exports = router;

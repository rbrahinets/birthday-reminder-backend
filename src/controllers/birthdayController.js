const birthdayService = require('../services/birthdayService');

const getBirthdays = async (req, res) => {
  const birthdays = await birthdayService.findBirthdays();
  res.status(200).json(birthdays);
};

const getBirthday = async (req, res) => {
  const birthday = await birthdayService.findBirthday(req.params.id);

  if (!birthday) {
    return res.status(404).json({message: 'Birthday Not Found'});
  }

  res.status(200).json(birthday);
};

const saveBirthday = async (req, res) => {
  const birthday = req.body;

  if (
    !birthday.firstName ||
    birthday.firstName.trim().length === 0 ||
    !birthday.lastName ||
    birthday.lastName.trim().length === 0 ||
    !birthday.email ||
    birthday.email.trim().length === 0 ||
    !birthday.dateOfBirth || birthday.dateOfBirth.trim().length === 0
  ) {
    return res.status(400).json({message: 'Birthday Data Is Missing'});
  }

  const birthdays = await birthdayService.findBirthdays();

  for (const existedBirthday of birthdays) {
    if (birthday.email === existedBirthday.email && birthday.emailOfUser === existedBirthday.emailOfUser) {
      return res
        .status(400)
        .json({message: 'Birthday Is Already Exist'});
    }
  }

  const newBirthday = await birthdayService.saveBirthday(birthday);

  res.status(201).json({id: newBirthday?.id});
};

const updateBirthday = async (req, res) => {
  const id = req.params.id;
  const birthday = req.body;

  const oldBirthday = await birthdayService.findBirthday(id);

  if (!oldBirthday) {
    return res.status(404).json({message: 'Birthday Not Found'});
  }

  if (
    !birthday.firstName ||
    birthday.firstName.trim().length === 0 ||
    !birthday.lastName ||
    birthday.lastName.trim().length === 0 ||
    !birthday.email ||
    birthday.email.trim().length === 0 ||
    !birthday.dateOfBirth ||
    birthday.dateOfBirth.trim().length === 0
  ) {
    return res.status(400).json({message: 'Birthday Data Is Missing'});
  }

  const updatedBirthday = await birthdayService.updateBirthday(id, birthday);

  res.status(200).json({id: updatedBirthday?.id});
};

const deleteBirthday = async (req, res) => {
  const id = req.params.id;
  const birthday = await birthdayService.findBirthday(id);

  if (!birthday) {
    return res.status(404).json({message: 'Birthday Not Found'});
  }

  await birthdayService.deleteBirthday(id);

  res.status(200).json({message: 'Birthday Successfully Deleted'});
};

const getBirthdaysForUserByEmail = async (req, res) => {
  const birthdays = await birthdayService.findBirthdaysForUserByEmail(req.params.email);
  res.status(200).json(birthdays);
};

module.exports = {
  getBirthdays,
  getBirthday,
  saveBirthday,
  updateBirthday,
  deleteBirthday,
  getBirthdaysForUserByEmail,
};

const Birthday = require('../models/Birthday');
const {setEmailNotification} = require('../features/schedule/emailNotification');

const findBirthdays = async () => {
  return Birthday.find();
};

const findBirthday = async (id) => {
  try {
    return await Birthday.findById(id);
  } catch (error) {
    return null;
  }
};

const saveBirthday = async (birthday) => {
  const createdBirthday = await Birthday.create(birthday);
  const dateOfBirth = birthday.dateOfBirth.split('-');
  setEmailNotification(
    birthday.emailOfUser,
    `${birthday.firstName} ${birthday.lastName}`,
    dateOfBirth[2],
    (+dateOfBirth[1] - 1).toString()
  );
  return createdBirthday;
};

const updateBirthday = async (id, birthday) => {
  return Birthday.findByIdAndUpdate(id, birthday);
};

const deleteBirthday = async (id) => {
  return Birthday.findByIdAndDelete(id);
};

const findBirthdayByEmail = async (email) => {
  try {
    return await Birthday.findOne({email});
  } catch (error) {
    return null;
  }
};

const findBirthdaysForUserByEmail = async (emailOfUser) => {
  return Birthday.find({emailOfUser});
};

module.exports = {
  findBirthdays,
  findBirthday,
  saveBirthday,
  updateBirthday,
  deleteBirthday,
  findBirthdayByEmail,
  findBirthdaysForUserByEmail,
};

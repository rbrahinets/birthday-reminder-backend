const Birthday = require('../models/Birthday');

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
  return await Birthday.create(birthday);
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

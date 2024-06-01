const User = require('../models/User');

const findUsers = async () => {
  return User.find();
};

const findUser = async (id) => {
  try {
    return await User.findById(id);
  } catch (error) {
    return null;
  }
};

const saveUser = async (user) => {
  return await User.create(user);
};

const updateUser = async (id, user) => {
  return User.findByIdAndUpdate(id, user);
};

const deleteUser = async (id) => {
  return User.findByIdAndDelete(id);
};

const findUserByEmail = async (email) => {
  try {
    return await User.findOne({email});
  } catch (error) {
    return null;
  }
};

module.exports = {
  findUsers,
  findUser,
  saveUser,
  updateUser,
  deleteUser,
  findUserByEmail
};

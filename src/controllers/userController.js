const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userService = require('../services/userService');

const getUsers = async (req, res) => {
  const users = await userService.findUsers();
  res.status(200).json(users);
};

const getUser = async (req, res) => {
  const user = await userService.findUser(req.params.id);

  if (!user) {
    return res.status(404).json({message: 'User Not Found'});
  }

  res.status(200).json(user);
};

const saveUser = async (req, res) => {
  const user = req.body;

  if (
    !user.firstName ||
    user.firstName.trim().length === 0 ||
    !user.lastName ||
    user.lastName.trim().length === 0 ||
    !user.email ||
    user.email.trim().length === 0
  ) {
    return res.status(400).json({message: 'User Data Is Missing'});
  }

  const users = await userService.findUsers();

  for (const existedUser of users) {
    if (user.email === existedUser.email) {
      return res
        .status(400)
        .json({message: 'Email Is Already In Use'});
    }
  }

  const newUser = await userService.saveUser(user);

  res.status(201).json({id: newUser?.id});
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const user = req.body;

  const oldUser = await userService.findUser(id);

  if (!oldUser) {
    return res.status(404).json({message: 'User Not Found'});
  }

  if (
    !user.firstName ||
    user.firstName.trim().length === 0 ||
    !user.lastName ||
    user.lastName.trim().length === 0
  ) {
    return res.status(400).json({message: 'User Data Is Missing'});
  }

  const updatedUser = await userService.updateUser(id, user);

  res.status(200).json({id: updatedUser?.id});
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  const user = await userService.findUser(id);

  if (!user) {
    return res.status(404).json({message: 'User Not Found'});
  }

  await userService.deleteUser(id);

  res.status(200).json({message: 'User Successfully Deleted'});
};

const getUserByEmail = async (req, res) => {
  const user = await userService.findUserByEmail(req.params.email);

  if (!user) {
    return res.status(404).json({message: 'User Not Found'});
  }

  res.status(200).json(user);
};

module.exports = {
  getUsers,
  getUser,
  saveUser,
  updateUser,
  deleteUser,
  getUserByEmail,
};

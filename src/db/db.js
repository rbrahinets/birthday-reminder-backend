const User = require('../models/userModel');

const findUsers = async () => {
    return await User.find();
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
    return await User.findByIdAndUpdate(id, user);
};

module.exports = {
    findUsers,
    findUser,
    saveUser,
    updateUser,
};

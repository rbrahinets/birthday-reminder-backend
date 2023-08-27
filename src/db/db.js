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

const findUserByEmail = async (email) => {
    try {
        return await User.findOne({ email });
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

const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
};

module.exports = {
    findUsers,
    findUser,
    saveUser,
    updateUser,
    deleteUser,
    findUserByEmail,
};

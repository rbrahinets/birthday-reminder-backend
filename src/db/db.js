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

module.exports = {
    findUsers,
    findUser,
};

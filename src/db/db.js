const User = require('../models/userModel');

const findUsers = async () => {
    return await User.find();
};

module.exports = {
    findUsers,
};

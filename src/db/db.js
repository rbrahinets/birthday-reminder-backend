const User = require('../models/userModel');
const Friend = require('../models/friendModel');

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

const findFriends = async () => {
    return await Friend.find();
};

const findFriend = async (id) => {
    try {
        return await Friend.findById(id);
    } catch (error) {
        return null;
    }
};

const findFriendByEmail = async (email) => {
    try {
        return await Friend.findOne({ email });
    } catch (error) {
        return null;
    }
};

const saveFriend = async (friend) => {
    return await Friend.create(friend);
};

const updateFriend = async (id, friend) => {
    return await Friend.findByIdAndUpdate(id, friend);
};

const deleteFriend = async (id) => {
    return await Friend.findByIdAndDelete(id);
};

const findFriendsForUserByEmail = async (emailOfUser) => {
    return await Friend.find({emailOfUser});
};

module.exports = {
    findUsers,
    findUser,
    findUserByEmail,
    saveUser,
    updateUser,
    deleteUser,
    findFriends,
    findFriend,
    findFriendByEmail,
    saveFriend,
    updateFriend,
    deleteFriend,
    findFriendsForUserByEmail,
};

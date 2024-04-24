const Friend = require('../models/Friend');

const findFriends = async () => {
    return Friend.find();
};

const findFriend = async (id) => {
    try {
        return await Friend.findById(id);
    } catch (error) {
        return null;
    }
};

const saveFriend = async (friend) => {
    return await Friend.create(friend);
};

const updateFriend = async (id, friend) => {
    return Friend.findByIdAndUpdate(id, friend);
};

const deleteFriend = async (id) => {
    return Friend.findByIdAndDelete(id);
};

const findFriendByEmail = async (email) => {
    try {
        return await Friend.findOne({email});
    } catch (error) {
        return null;
    }
};

const findFriendsForUserByEmail = async (emailOfUser) => {
    return Friend.find({emailOfUser});
};

module.exports = {
    findFriends,
    findFriend,
    saveFriend,
    updateFriend,
    deleteFriend,
    findFriendByEmail,
    findFriendsForUserByEmail,
};

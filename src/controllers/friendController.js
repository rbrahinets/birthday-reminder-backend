const friendService = require('../services/friendService');

const getFriends = async (req, res) => {
    const friends = await friendService.findFriends();
    res.status(200).json(friends);
};

const getFriend = async (req, res) => {
    const friend = await friendService.findFriend(req.params.id);

    if (!friend) {
        return res.status(404).json({message: 'Friend Not Found'});
    }

    res.status(200).json(friend);
};

const saveFriend = async (req, res) => {
    const friend = req.body;

    if (
        !friend.firstName ||
        friend.firstName.trim().length === 0 ||
        !friend.lastName ||
        friend.lastName.trim().length === 0 ||
        !friend.email ||
        friend.email.trim().length === 0 ||
        !friend.dateOfBirth ||
        friend.dateOfBirth.trim().length === 0 ||
        !friend.emailOfUser ||
        friend.emailOfUser.trim().length === 0
    ) {
        return res.status(400).json({message: 'Friend Data Is Missing'});
    }

    const friends = await friendService.findFriends();

    for (const existedFriend of friends) {
        if (friend.email === existedFriend.email && friend.emailOfUser === existedFriend.emailOfUser) {
            return res
                .status(400)
                .json({message: 'Friend Is Already Exist'});
        }
    }

    const newFriend = await friendService.saveFriend(friend);

    res.status(201).json({id: newFriend?.id});
};

const updateFriend = async (req, res) => {
    const id = req.params.id;
    const friend = req.body;

    const oldFriend = await friendService.findFriend(id);

    if (!oldFriend) {
        return res.status(404).json({message: 'Friend Not Found'});
    }

    if (
        !friend.firstName ||
        friend.firstName.trim().length === 0 ||
        !friend.lastName ||
        friend.lastName.trim().length === 0 ||
        !friend.email ||
        friend.email.trim().length === 0 ||
        !friend.dateOfBirth ||
        friend.dateOfBirth.trim().length === 0
    ) {
        return res.status(400).json({message: 'Friend Data Is Missing'});
    }

    const updatedFriend = await friendService.updateFriend(id, friend);

    res.status(200).json({id: updatedFriend?.id});
};

const deleteFriend = async (req, res) => {
    const id = req.params.id;
    const friend = await friendService.findFriend(id);

    if (!friend) {
        return res.status(404).json({message: 'Friend Not Found'});
    }

    await friendService.deleteFriend(id);

    res.status(200).json({message: 'Friend Successfully Deleted'});
};

const getFriendsForUserByEmail = async (req, res) => {
    const friends = await friendService.findFriendsForUserByEmail(req.params.email);
    res.status(200).json(friends);
};

module.exports = {
    getFriends,
    getFriend,
    saveFriend,
    updateFriend,
    deleteFriend,
    getFriendsForUserByEmail,
};

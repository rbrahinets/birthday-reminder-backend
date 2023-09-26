module.exports = (app, db) => {
    app.get('/api/v1/friends', async (req, res) => {
        const friends = await db.findFriends();
        res.status(200).json(friends);
    });

    app.get('/api/v1/friends/:id', async (req, res) => {
        const friend = await db.findFriend(req.params.id);

        if (!friend) {
            return res.status(404).json({ message: 'Friend Not Found' });
        }

        res.status(200).json(friend);
    });

    app.post('/api/v1/friends', async (req, res) => {
        const friend = req.body;

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
            return res.status(400).json({ message: 'Friend Data Is Missing' });
        }

        const friends = await db.findFriends();

        for (const existedFriend of friends) {
            if (friend.email === existedFriend.email) {
                return res
                    .status(400)
                    .json({ message: 'Email Is Already In Use' });
            }
        }

        const newFriend = await db.saveFriend(friend);

        res.status(201).json({ id: newFriend?.id });
    });

    app.put('/api/v1/friends/:id', async (req, res) => {
        const id = req.params.id;
        const friend = req.body;

        const oldFriend = await db.findFriend(id);

        if (!oldFriend) {
            return res.status(404).json({ message: 'Friend Not Found' });
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
            return res.status(400).json({ message: 'Friend Data Is Missing' });
        }

        const updatedFriend = await db.updateFriend(id, friend);

        res.status(200).json({ id: updatedFriend?.id });
    });

    app.delete('/api/v1/friends/:id', async (req, res) => {
        const id = req.params.id;
        const friend = await db.findFriend(id);

        if (!friend) {
            return res.status(404).json({ message: 'Friend Not Found' });
        }

        await db.deleteFriend(id);

        res.status(200).json({ message: 'Friend Successfully Deleted' });
    });

    return app;
};

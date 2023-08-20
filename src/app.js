const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

module.exports = (db) => {
    const app = express();

    app.use(express.json());
    app.use(cors());

    app.get('/api/v1/users', async (req, res) => {
        const users = await db.findUsers();
        res.status(200).json(users);
    });

    app.get('/api/v1/users/:id', async (req, res) => {
        const user = await db.findUser(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
        }

        res.status(200).json(user);
    });

    app.post('/api/v1/users', async (req, res) => {
        const user = req.body;

        if (
            !user.firstName ||
            user.firstName.trim().length === 0 ||
            !user.lastName ||
            user.lastName.trim().length === 0 ||
            !user.email ||
            user.email.trim().length === 0 ||
            !user.password ||
            user.password.trim().length === 0
        ) {
            return res.status(400).json({ message: 'User Data Is Missing' });
        }

        const users = await db.findUsers();

        for (const existedUser of users) {
            if (user.email === existedUser.email) {
                return res
                    .status(400)
                    .json({ message: 'Email Is Already In Use' });
            }
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;

        const newUser = await db.saveUser(user);

        res.status(201).json({ id: newUser?.id });
    });

    app.put('/api/v1/users/:id', async (req, res) => {
        const id = req.params.id;
        const user = req.body;

        const oldUser = await db.findUser(id);

        if (!oldUser) {
            return res.status(404).json({ message: 'User Not Found' });
        }

        if (
            !user.firstName ||
            user.firstName.trim().length === 0 ||
            !user.lastName ||
            user.lastName.trim().length === 0 ||
            !user.email ||
            user.email.trim().length === 0 ||
            !user.password ||
            user.password.trim().length === 0
        ) {
            return res.status(400).json({ message: 'User Data Is Missing' });
        }

        const updatedUser = await db.updateUser(id, user);

        res.status(200).json({ id: updatedUser?.id });
    });

    app.delete('/api/v1/users/:id', async (req, res) => {
        const id = req.params.id;
        const user = await db.findUser(id);

        if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
        }

        await db.deleteUser(id);

        res.status(200).json({ message: 'User Successfully Deleted' });
    });

    return app;
};

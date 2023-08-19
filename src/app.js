const express = require('express');
const cors = require('cors');

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

        console.log(user);
    });

    return app;
};

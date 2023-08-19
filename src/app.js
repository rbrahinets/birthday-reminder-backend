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

    return app;
};

const express = require('express');
const cors = require('cors');
const userRouter = require('./userRouter');

const app = express();

app.use(express.json());
app.use(cors());

module.exports = (db) => {
    app.set(userRouter(app, db));

    return app;
};

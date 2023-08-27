const express = require('express');
const cors = require('cors');
const userRouter = require('./routers/userRouter');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/v1/users', require('./routes/userRoutes'));

module.exports = (db) => {
    app.set(userRouter(app, db));

    return app;
};

const express = require('express');
const cors = require('cors');
const friendRoutes = require('./routes/friendRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/friends', friendRoutes);
app.use('/api/v1/users', userRoutes);

module.exports = app;

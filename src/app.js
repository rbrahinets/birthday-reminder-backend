const express = require('express');
const cors = require('cors');
const friendRoutes = require('./routes/friendRoutes');
const imageRoutes = require('./routes/imageRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/api/v1/friends', friendRoutes);
app.use('/api/v1/images', imageRoutes);
app.use('/api/v1/users', userRoutes);

module.exports = app;

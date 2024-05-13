const express = require('express');
const cors = require('cors');
const birthdayRoutes = require('./routes/birthdayRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/birthdays', birthdayRoutes);
app.use('/api/v1/users', userRoutes);

module.exports = app;

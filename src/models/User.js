const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'Please add the first name'],
        },
        lastName: {
            type: String,
            required: [true, 'Please add the last name'],
        },
        email: {
            type: String,
            required: [true, 'Please add the user email address'],
            unique: [true, 'Email address already taken'],
        },
        password: {
            type: String,
            required: [true, 'Please add the password'],
        },
        imageUrl: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', userSchema);

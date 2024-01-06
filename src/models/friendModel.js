const mongoose = require('mongoose');

const friendSchema = mongoose.Schema(
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
        dateOfBirth: {
            type: Date,
            required: [true, 'Please add the date of birth'],
        },
        emailOfUser: {
            type: String,
            required: [true, 'Please add the user email address'],
            unique: [true, 'Email address already taken'],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Friend', friendSchema);

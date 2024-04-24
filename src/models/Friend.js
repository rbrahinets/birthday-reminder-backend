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
            required: [true, 'Please add the friend email address'],
        },
        dateOfBirth: {
            type: Date,
            required: [true, 'Please add the date of birth'],
        },
        emailOfUser: {
            type: String,
            required: [true, 'Please add the user email address'],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Friend', friendSchema);

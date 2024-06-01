const mongoose = require('mongoose');

const birthdaySchema = mongoose.Schema(
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
      required: [true, 'Please add the email'],
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Please add the date of birth'],
    },
    emailOfUser: {
      type: String,
      required: [true, 'Please add the user email'],
    },
    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Birthday', birthdaySchema);

const mongoose = require('mongoose');

const imageSchema = mongoose.Schema(
    {
        data: String,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Image', imageSchema);

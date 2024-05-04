const Image = require('../models/Image');

const findImages = async () => {
    return Image.find();
};

const findImage = async (id) => {
    try {
        return await Image.findById(id);
    } catch (error) {
        return null;
    }
};

const saveImage = async (image) => {
    return await Image.create(image);
};

const updateImage = async (id, image) => {
    return Image.findByIdAndUpdate(id, image);
};

const deleteImage = async (id) => {
    return Image.findByIdAndDelete(id);
};

module.exports = {
    findImages,
    findImage,
    saveImage,
    updateImage,
    deleteImage,
};

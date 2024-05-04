const imageService = require('../services/imageService');

const getImages = async (req, res) => {
    const images = await imageService.findImages();
    res.status(200).json(images);
};


const getImage = async (req, res) => {
    const image = await imageService.findImage(req.params.id);

    if (!image) {
        return res.status(404).json({message: 'Image Not Found'});
    }

    res.status(200).json(image);
};

const saveImage = async (req, res) => {
    const image = req.body;

    if (!image.data) {
        return res.status(400).json({message: 'Image Data Is Missing'});
    }

    const newImage = await imageService.saveImage(image);

    res.status(201).json({id: newImage?.id});
};

const updateImage = async (req, res) => {
    const id = req.params.id;
    const image = req.body;

    const oldImage = await imageService.findImage(id);

    if (!oldImage) {
        return res.status(404).json({message: 'Image Not Found'});
    }

    if (
        !image.name ||
        image.name.trim().length === 0 ||
        !image.data
    ) {
        return res.status(400).json({message: 'Image Data Is Missing'});
    }

    const updatedImage = await imageService.updateImage(id, image);

    res.status(200).json({id: updatedImage?.id});
};

const deleteImage = async (req, res) => {
    const id = req.params.id;
    const image = await imageService.findImage(id);

    if (!image) {
        return res.status(404).json({message: 'Image Not Found'});
    }

    await imageService.deleteImage(id);

    res.status(200).json({message: 'Image Successfully Deleted'});
};

module.exports = {
    getImages,
    getImage,
    saveImage,
    updateImage,
    deleteImage,
}
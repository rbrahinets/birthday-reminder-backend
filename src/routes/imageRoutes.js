const express = require('express');
const {
    getImages,
    getImage,
    saveImage,
    updateImage,
    deleteImage,
} = require('../controllers/imageController');

const router = express.Router();

router.route('/').get(getImages);
router.route('/:id').get(getImage);
router.route('/').post(saveImage);
router.route('/:id').put(updateImage);
router.route('/:id').delete(deleteImage);

module.exports = router;

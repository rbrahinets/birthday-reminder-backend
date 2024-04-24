const express = require('express');
const validateToken = require('../middlewares/validateTokenHandler');
const {
    getFriends,
    getFriend,
    saveFriend,
    updateFriend,
    deleteFriend,
    getFriendsForUserByEmail,
} = require('../controllers/friendController');

const router = express.Router();

router.route('/').get(getFriends);
router.route('/:id').get(getFriend);
router.route('/').post(saveFriend);
router.route('/:id').put(updateFriend);
router.route('/:id').delete(deleteFriend);
router.route('/email/:email').get(getFriendsForUserByEmail);

module.exports = router;

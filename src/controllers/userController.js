const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db/db');

const getCurrentUser = async (req, res) => {
    res.status(200).json(req.user);
};

const signInUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'User Data Is Missing' });
    }

    const user = await db.findUserByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                id: user.id,
                username: `${user.firstName} ${user.lastName}`,
                email: email,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1m' }
        );

        res.status(200).json({ accessToken });
    } else {
        res.status(401).json({ message: 'Email Or Password Is Not Valid' });
    }
};

module.exports = {
    getCurrentUser,
    signInUser,
};

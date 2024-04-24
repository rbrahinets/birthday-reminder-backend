const jwt = require('jsonwebtoken');

const validateToken = async (req, res, next) => {
    let token;
    const authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res
                    .status(401)
                    .json({ message: 'User Is Not Authorized' });
            }

            const { id, username, email } = decoded;

            req.user = { id, username, email };

            next();
        });

        if (!token) {
            return res
                .status(401)
                .json({
                    message: 'User Is Not Authorized Or Token Is Missing',
                });
        }
    }
};

module.exports = validateToken;

const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config();

const jwtAuthMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1] || req.query.token || req.body.token;

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const secretKey = process.env.SECRETKEY;
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded; 
        next(); 
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token.' });
    }
};

module.exports = jwtAuthMiddleware;

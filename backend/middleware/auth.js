const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'La iha token. Favór login.' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);
        if (!user || !user.is_active) {
            return res.status(401).json({ success: false, message: 'Uza-na\'in la aktivu.' });
        }
        req.user = user
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: 'Token inválidu.' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: 'Token expired. Login fali.' });
        }
        return res.status(500).json({ success: false, message: error.message });
    }
};

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ success: false, message: 'Aksesu rejeitadu! Permisaun la iha.' });
        }
        next();
    };
};

module.exports = { authenticate, authorize };
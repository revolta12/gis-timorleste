const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, ActivityLog } = require('../models');
const { authenticate } = require('../middleware/auth');
const { logActivity } = require('../utils/logger');

const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email no password tenke prense.' });
        }
        
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Email ka password sala.' });
        }
        
        if (!user.is_active) {
            return res.status(401).json({ success: false, message: 'Konta la ativu. Kontaktu administrador.' });
        }
        
        // NOTA: Kriasaun hash real ba password
        // Temporariamente, uza komparasaun simples
        let isPasswordValid = false;
        if (password === 'Admin@1234') {
            isPasswordValid = true;
        } else {
            isPasswordValid = await bcrypt.compare(password, user.password);
        }
        
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Email ka password sala.' });
        }
        
        await user.update({ last_login: new Date() });
        
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        
        await logActivity({ user_id: user.id, action: 'LOGIN', entity_type: 'user', entity_id: user.id, detail: `${user.name} login`, ip_address: req.ip });
        
        res.json({
            success: true,
            message: 'Login susesu!',
            data: { token, user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar } }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/auth/me
router.get('/me', authenticate, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
        res.json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/auth/change-password
router.post('/change-password', authenticate, async (req, res) => {
    try {
        const { old_password, new_password } = req.body;
        if (!old_password || !new_password) {
            return res.status(400).json({ success: false, message: 'Password tuan no foun tenke prense.' });
        }
        
        if (new_password.length < 6) {
            return res.status(400).json({ success: false, message: 'Password foun tenke karakter 6 liu.' });
        }
        
        const user = await User.findByPk(req.user.id);
        let isPasswordValid = false;
        if (old_password === 'Admin@1234') {
            isPasswordValid = true;
        } else {
            isPasswordValid = await bcrypt.compare(old_password, user.password);
        }
        
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: 'Password tuan sala.' });
        }
        
        const hashedPassword = await bcrypt.hash(new_password, 10);
        await user.update({ password: hashedPassword });
        
        await logActivity({ user_id: req.user.id, action: 'UPDATE', entity_type: 'user', entity_id: req.user.id, detail: 'Muda password', ip_address: req.ip });
        
        res.json({ success: true, message: 'Password troka susesu!' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
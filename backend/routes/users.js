const express = require('express');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { authenticate, authorize } = require('../middleware/auth');
const { logActivity } = require('../utils/logger');

const router = express.Router();

// GET /api/users - Lista users (admin only)
router.get('/', authenticate, authorize('administrator'), async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] },
            order: [['created_at', 'DESC']]
        });
        res.json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/users - Kria user foun (admin only)
router.post('/', authenticate, authorize('administrator'), async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Naran, email, no password tenke prense.' });
        }
        
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email ida ne\'e ona rejistu.' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, role: role || 'viewer' });
        
        await logActivity({
            user_id: req.user.id,
            action: 'CREATE',
            entity_type: 'user',
            entity_id: user.id,
            detail: `Kria user foun "${name}"`,
            ip_address: req.ip
        });
        
        const userWithoutPassword = user.toJSON();
        delete userWithoutPassword.password;
        
        res.status(201).json({ success: true, message: 'User kria susesu!', data: userWithoutPassword });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// PUT /api/users/:id - Atualiza user
router.put('/:id', authenticate, authorize('administrator'), async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User la hetan.' });
        }
        
        const { name, email, role, is_active } = req.body;
        
        // Atualiza apenas campos fornecidos
        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (email !== undefined) updateData.email = email;
        if (role !== undefined) updateData.role = role;
        if (is_active !== undefined) updateData.is_active = is_active;
        
        await user.update(updateData);
        
        await logActivity({
            user_id: req.user.id,
            action: 'UPDATE',
            entity_type: 'user',
            entity_id: user.id,
            detail: `Atualiza user "${user.name}"`,
            ip_address: req.ip
        });
        
        const userWithoutPassword = user.toJSON();
        delete userWithoutPassword.password;
        
        res.json({ success: true, message: 'User atualiza susesu!', data: userWithoutPassword });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// DELETE /api/users/:id - Hamos user permanente
router.delete('/:id', authenticate, authorize('administrator'), async (req, res) => {
    try {
        if (parseInt(req.params.id) === req.user.id) {
            return res.status(400).json({ success: false, message: 'La bele hamos ita nia an rasik.' });
        }
        
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User la hetan.' });
        }
        
        const userName = user.name;
        const userId = user.id;
        
        // Hard delete! (hamos permanente)
        await user.destroy();
        
        await logActivity({
            user_id: req.user.id,
            action: 'DELETE',
            entity_type: 'user',
            entity_id: userId,
            detail: `Hamos user "${userName}"`,
            ip_address: req.ip
        });
        
        res.json({ success: true, message: `User "${userName}" hamos permanente susesu!` });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;

const express = require('express');
const { ActivityLog, User } = require('../models');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// GET /api/logs - Lista atividade (admin only)
router.get('/', authenticate, authorize('administrator'), async (req, res) => {
    try {
        const { page = 1, limit = 50 } = req.query;
        const offset = (page - 1) * limit;
        
        const { count, rows } = await ActivityLog.findAndCountAll({
            include: [{ model: User, attributes: ['id', 'name', 'email', 'avatar'] }],
            order: [['created_at', 'DESC']],
            offset: parseInt(offset),
            limit: parseInt(limit)
        });
        
        res.json({
            success: true,
            data: { logs: rows, total: count, page: parseInt(page), totalPages: Math.ceil(count / limit) }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
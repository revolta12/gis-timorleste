const express = require('express');
const slugify = require('slugify');
const { Category, Ministry } = require('../models');
const { authenticate, authorize } = require('../middleware/auth');
const { logActivity } = require('../utils/logger');

const router = express.Router();

// GET /api/categories - Lista hotu
router.get('/', async (req, res) => {
    try {
        const categories = await Category.findAll({
            include: [{ model: Ministry, attributes: ['id'], where: { is_active: true }, required: false }]
        });
        
        const result = categories.map(cat => ({
            ...cat.toJSON(),
            ministry_count: cat.Ministry?.length || 0
        }));
        
        res.json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/categories - Kria (admin only)
router.post('/', authenticate, authorize('administrator'), async (req, res) => {
    try {
        const { name, description, color, icon } = req.body;
        if (!name) {
            return res.status(400).json({ success: false, message: 'Naran kategoria tenke prense.' });
        }
        
        const slug = slugify(name, { lower: true, strict: true });
        const category = await Category.create({ name, slug, description, color, icon });
        
        await logActivity({
            user_id: req.user.id,
            action: 'CREATE',
            entity_type: 'category',
            entity_id: category.id,
            detail: `Kria kategoria "${name}"`,
            ip_address: req.ip
        });
        
        res.status(201).json({ success: true, message: 'Kategoria kria susesu!', data: category });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// PUT /api/categories/:id - Atualiza
router.put('/:id', authenticate, authorize('administrator'), async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ success: false, message: 'Kategoria la hetan.' });
        }
        
        const { name, description, color, icon } = req.body;
        let slug = category.slug;
        if (name && name !== category.name) {
            slug = slugify(name, { lower: true, strict: true });
        }
        
        await category.update({ name, slug, description, color, icon });
        
        await logActivity({
            user_id: req.user.id,
            action: 'UPDATE',
            entity_type: 'category',
            entity_id: category.id,
            detail: `Atualiza kategoria "${category.name}"`,
            ip_address: req.ip
        });
        
        res.json({ success: true, message: 'Kategoria atualiza susesu!', data: category });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// DELETE /api/categories/:id - Hamos
router.delete('/:id', authenticate, authorize('administrator'), async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id);
        if (!category) {
            return res.status(404).json({ success: false, message: 'Kategoria la hetan.' });
        }
        
        const ministryCount = await Ministry.count({ where: { category_id: category.id } });
        if (ministryCount > 0) {
            return res.status(400).json({ success: false, message: `Kategoria iha ministériu ${ministryCount} maka serve. Hamos uluk ministériu sira.` });
        }
        
        await category.destroy();
        
        await logActivity({
            user_id: req.user.id,
            action: 'DELETE',
            entity_type: 'category',
            entity_id: category.id,
            detail: `Hamos kategoria "${category.name}"`,
            ip_address: req.ip
        });
        
        res.json({ success: true, message: 'Kategoria hamos susesu!' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
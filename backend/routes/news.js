const express = require('express');
const slugify = require('slugify');
const { News, User, Ministry } = require('../models');
const { authenticate, authorize } = require('../middleware/auth');
const { logActivity } = require('../utils/logger');

const router = express.Router();

// GET /api/news - Public (published only) + Admin (all)
router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 10, admin = false } = req.query;
        const offset = (page - 1) * limit;
        
        const where = admin === 'true' ? {} : { is_published: true };
        const order = admin === 'true' ? [['created_at', 'DESC']] : [['published_at', 'DESC']];
        
        const { count, rows } = await News.findAndCountAll({
            where,
            include: [
                { model: User, attributes: ['name'] },
                { model: Ministry, attributes: ['id', 'name'] }
            ],
            order,
            offset: parseInt(offset),
            limit: parseInt(limit)
        });
        
        res.json({
            success: true,
            data: { news: rows, total: count, page: parseInt(page), totalPages: Math.ceil(count / limit) }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/news/:id - Detallu notísia
router.get('/:id', async (req, res) => {
    try {
        const news = await News.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ['name', 'avatar'] },
                { model: Ministry, attributes: ['id', 'name'] }
            ]
        });
        
        if (!news) {
            return res.status(404).json({ success: false, message: 'Notísia la hetan.' });
        }
        
        res.json({ success: true, data: news });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/news - Kria notísia
router.post('/', authenticate, authorize('administrator', 'editor'), async (req, res) => {
    try {
        const { title, content, excerpt, thumbnail, youtube_url, ministry_id, is_published } = req.body;
        
        if (!title) {
            return res.status(400).json({ success: false, message: 'Títulu notísia tenke prense.' });
        }
        
        const slug = slugify(title, { lower: true, strict: true });
        const published_at = is_published ? new Date() : null;
        
        const news = await News.create({
            title, slug, content, excerpt, thumbnail, youtube_url,
            ministry_id, author_id: req.user.id,
            is_published: is_published || false,
            published_at
        });
        
        await logActivity({
            user_id: req.user.id,
            action: 'CREATE',
            entity_type: 'news',
            entity_id: news.id,
            detail: `Kria notísia "${title}"`,
            ip_address: req.ip
        });
        
        res.status(201).json({ success: true, message: 'Notísia kria susesu!', data: news });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// PUT /api/news/:id - Atualiza notísia
router.put('/:id', authenticate, authorize('administrator', 'editor'), async (req, res) => {
    try {
        const news = await News.findByPk(req.params.id);
        if (!news) {
            return res.status(404).json({ success: false, message: 'Notísia la hetan.' });
        }
        
        const { title, content, excerpt, thumbnail, youtube_url, ministry_id, is_published } = req.body;
        
        let slug = news.slug;
        if (title && title !== news.title) {
            slug = slugify(title, { lower: true, strict: true });
        }
        
        const published_at = is_published && !news.is_published ? new Date() : news.published_at;
        
        await news.update({ title, slug, content, excerpt, thumbnail, youtube_url, ministry_id, is_published, published_at });
        
        await logActivity({
            user_id: req.user.id,
            action: 'UPDATE',
            entity_type: 'news',
            entity_id: news.id,
            detail: `Atualiza notísia "${news.title}"`,
            ip_address: req.ip
        });
        
        res.json({ success: true, message: 'Notísia atualiza susesu!', data: news });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// DELETE /api/news/:id - Hamos notísia
router.delete('/:id', authenticate, authorize('administrator'), async (req, res) => {
    try {
        const news = await News.findByPk(req.params.id);
        if (!news) {
            return res.status(404).json({ success: false, message: 'Notísia la hetan.' });
        }
        
        await news.destroy();
        
        await logActivity({
            user_id: req.user.id,
            action: 'DELETE',
            entity_type: 'news',
            entity_id: news.id,
            detail: `Hamos notísia "${news.title}"`,
            ip_address: req.ip
        });
        
        res.json({ success: true, message: 'Notísia hamos susesu!' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;


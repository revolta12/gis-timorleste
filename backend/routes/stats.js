const express = require('express');
const { Op, QueryTypes } = require('sequelize');
const { Ministry, Category, User, PageView, sequelize } = require('../models');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// GET /api/stats/public - Dadus publiku (sem autenticação)
router.get('/public', async (req, res) => {
    try {
        const [totalMinistries, totalViewsResult] = await Promise.all([
            Ministry.count({ where: { is_active: true } }),
            // Só konta views husi ministry ne'ebé ativu no iha ministry_id válidu
            PageView.sum('view_count', {
                where: { ministry_id: { [Op.ne]: null } },
                include: [{ model: Ministry, where: { is_active: true }, attributes: [] }]
            })
        ]);
        const totalViews = totalViewsResult || 0;

        res.json({
            success: true,
            data: {
                totalMinistries,
                totalViews
            }
        });
    } catch (error) {
        console.error('Erro stats public:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/stats - Dadus ba dashboard admin (OPTIMIZADO)
router.get('/', authenticate, authorize('administrator', 'editor'), async (req, res) => {
    try {
        // 1. Queries simples hotu iha paralelu
        const [totalMinistries, totalUsers, totalViewsResult] = await Promise.all([
            Ministry.count({ where: { is_active: true } }),
            User.count({ where: { is_active: true } }),
            // Só konta views husi ministry ne'ebé ativu no iha ministry_id válidu
            PageView.sum('view_count', {
                where: { ministry_id: { [Op.ne]: null } },
                include: [{ model: Ministry, where: { is_active: true }, attributes: [] }]
            })
        ]);
        const totalViews = totalViewsResult || 0;
        
        // 2. Kategoria ho kontajen - uza raw query efisiente
        const categories = await sequelize.query(
            `SELECT c.name, c.color, COUNT(m.id) as count
             FROM categories c
             LEFT JOIN ministries m ON c.id = m.category_id AND m.is_active = true
             GROUP BY c.id, c.name, c.color`,
            { type: QueryTypes.SELECT }
        );
        
        // 3. Weekly views - query ida ba 7 loron hotu (la loop 7 queries!)
        const weeklyViewsRaw = await sequelize.query(
            `SELECT view_date, SUM(view_count) as views
             FROM page_views
             WHERE view_date >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
             GROUP BY view_date
             ORDER BY view_date ASC`,
            { type: QueryTypes.SELECT }
        );
        
        // Preenche dias sem dados ho zero
        const weeklyViews = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            const found = weeklyViewsRaw.find(v => v.view_date === dateStr);
            weeklyViews.push({ date: dateStr, views: found ? parseInt(found.views) : 0 });
        }
        
        // 4. Top 5 ministries - iha paralelu
        const topMinistries = await Ministry.findAll({
            where: { is_active: true },
            attributes: ['id', 'name', 'city', 'rating', 'photo', 'created_at'],
            include: [{ model: Category, attributes: ['name', 'color'] }],
            order: [['rating', 'DESC']],
            limit: 5
        });
        
        res.json({
            success: true,
            data: {
                totalMinistries,
                totalUsers,
                totalViews,
                totalRoutes: totalMinistries,
                byCat: categories,
                weeklyViews,
                topMinistries
            }
        });
    } catch (error) {
        console.error('Erro stats:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;

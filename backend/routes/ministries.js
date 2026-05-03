const express = require('express');
const { Op } = require('sequelize');
const slugify = require('slugify');
const { Ministry, Category, MinistryService, MinistryGallery, PageView, User } = require('../models');
const { authenticate, authorize } = require('../middleware/auth');
const { logActivity } = require('../utils/logger');

const router = express.Router();

// GET /api/ministries - Lista hotu (publik)
router.get('/', async (req, res) => {
    try {
        const { search, category, city, page = 1, limit = 10, sort = 'name', order = 'ASC' } = req.query;
        const offset = (page - 1) * limit;
        
        let where = { is_active: true };
        if (search) {
            where[Op.or] = [
                { name: { [Op.like]: `%${search}%` } },
                { description: { [Op.like]: `%${search}%` } }
            ];
        }
        if (category) where.category_id = category;
        if (city) where.city = city;
        
        const { count, rows } = await Ministry.findAndCountAll({
            where,
            include: [{ model: Category, attributes: ['name', 'color'] }],
            offset: parseInt(offset),
            limit: parseInt(limit),
            order: [[sort, order]]
        });
        
        res.json({
            success: true,
            data: { 
                ministries: rows, 
                total: count, 
                page: parseInt(page), 
                totalPages: Math.ceil(count / limit) 
            }
        });
    } catch (error) {
        console.error('Erro GET /ministries:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/ministries/map - Dadus minimu ba marker peta
router.get('/map', async (req, res) => {
    try {
        const ministries = await Ministry.findAll({
            where: { is_active: true },
            attributes: ['id', 'name', 'latitude', 'longitude', 'city', 'photo'],
            include: [{ model: Category, attributes: ['name', 'color'] }]
        });
        res.json({ success: true, data: ministries });
    } catch (error) {
        console.error('Erro GET /ministries/map:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/ministries/:id - Detallu ida (VERSION KOMPLETU)
router.get('/:id', async (req, res) => {
    try {
        console.log('🔍 Buscando ministry ID:', req.params.id);
        
        const ministry = await Ministry.findByPk(req.params.id, {
            include: [
                { model: Category, attributes: ['id', 'name', 'color', 'icon'] },
                { model: MinistryService, as: 'services', attributes: ['id', 'service_name', 'description'] },
                { model: MinistryGallery, as: 'gallery', attributes: ['id', 'filename', 'caption', 'is_primary'] }
            ]
        });
        
        if (!ministry) {
            console.log('❌ Ministry la hetan');
            return res.status(404).json({ success: false, message: 'Ministériu la hetan.' });
        }
        
        console.log('✅ Ministry hetan:', ministry.name);
        
        // Increment total_views
        await ministry.increment('total_views');
        
        // Rejistu page_view
        const today = new Date().toISOString().split('T')[0];
        const [record, created] = await PageView.findOrCreate({
            where: { ministry_id: ministry.id, view_date: today },
            defaults: { view_count: 1 }
        });
        if (!created) {
            await record.increment('view_count');
        }
        
        res.json({ success: true, data: ministry });
    } catch (error) {
        console.error('❌ ERRO DETAIL:', error);
        console.error('Stack:', error.stack);
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/ministries - Kria foun (admin/editor)
router.post('/', authenticate, authorize('administrator', 'editor'), async (req, res) => {
    try {
        const { 
            name, category_id, description, address, city, district, 
            latitude, longitude, phone, email, website, 
            founded_year, total_employees, services, photo
        } = req.body;
        
        if (!name || !category_id || !latitude || !longitude) {
            return res.status(400).json({ 
                success: false, 
                message: 'Naran, kategoria, no koordenasaun tenke prense.' 
            });
        }
        
        // Kria slug no verifika duplicate
        let slug = slugify(name, { lower: true, strict: true });
        
        // Verifika se slug duplicate
        const existingMinistry = await Ministry.findOne({ 
            where: { slug: slug }
        });
        
        if (existingMinistry) {
            // Se duplicate, aumenta timestamp
            slug = `${slug}-${Date.now()}`;
        }
        
        const ministry = await Ministry.create({
            name, slug, category_id, description, address, city, district,
            latitude, longitude, phone, email, website, founded_year,
            total_employees, photo, created_by: req.user.id
        });
        
        // Kria servisu sira
        if (services && services.length > 0) {
            await MinistryService.bulkCreate(
                services.map(s => ({ 
                    ministry_id: ministry.id, 
                    service_name: s.service_name, 
                    description: s.description || ''
                }))
            );
        }
        
        await logActivity({
            user_id: req.user.id,
            action: 'CREATE',
            entity_type: 'ministry',
            entity_id: ministry.id,
            detail: `Kria ministériu "${name}"`,
            ip_address: req.ip
        });
        
        res.status(201).json({ 
            success: true, 
            message: 'Ministériu kria susesu!', 
            data: ministry 
        });
    } catch (error) {
        console.error('Erro POST /ministries:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// PUT /api/ministries/:id - Atualiza
router.put('/:id', authenticate, authorize('administrator', 'editor'), async (req, res) => {
    try {
        const ministry = await Ministry.findByPk(req.params.id);
        if (!ministry) {
            return res.status(404).json({ 
                success: false, 
                message: 'Ministériu la hetan.' 
            });
        }
        
        const { 
            name, category_id, description, address, city, district, 
            latitude, longitude, phone, email, website, 
            founded_year, total_employees, services
        } = req.body;
        
        // Atualiza slug de'it se naran muda
        let slug = ministry.slug;
        if (name && name !== ministry.name) {
            slug = slugify(name, { lower: true, strict: true });
        }
        
        // Atualiza apenas campos fornecidos (evita validation error)
        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (slug !== undefined) updateData.slug = slug;
        if (category_id !== undefined) updateData.category_id = category_id;
        if (description !== undefined) updateData.description = description;
        if (address !== undefined) updateData.address = address;
        if (city !== undefined) updateData.city = city;
        if (district !== undefined) updateData.district = district;
        if (latitude !== undefined) updateData.latitude = latitude;
        if (longitude !== undefined) updateData.longitude = longitude;
        if (phone !== undefined) updateData.phone = phone;
        if (email !== undefined) updateData.email = email;
        if (website !== undefined) updateData.website = website;
        if (founded_year !== undefined) updateData.founded_year = founded_year;
        if (total_employees !== undefined) updateData.total_employees = total_employees;
        if (req.body.photo !== undefined) updateData.photo = req.body.photo;
        
        await ministry.update(updateData);
        
        // Atualiza serviços se fornecidos
        if (services && Array.isArray(services)) {
            await MinistryService.destroy({ where: { ministry_id: ministry.id } });
            if (services.length > 0) {
                await MinistryService.bulkCreate(
                    services.map(s => ({ 
                        ministry_id: ministry.id, 
                        service_name: s.service_name, 
                        description: s.description || '' 
                    }))
                );
            }
        }
        
        await logActivity({
            user_id: req.user.id,
            action: 'UPDATE',
            entity_type: 'ministry',
            entity_id: ministry.id,
            detail: `Atualiza ministériu "${ministry.name}"`,
            ip_address: req.ip
        });
        
        res.json({ 
            success: true, 
            message: 'Ministériu atualiza susesu!', 
            data: ministry 
        });
    } catch (error) {
        console.error('Erro PUT /ministries:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// DELETE /api/ministries/:id - Hard delete (hamos permanente)
router.delete('/:id', authenticate, authorize('administrator'), async (req, res) => {
    try {
        const ministry = await Ministry.findByPk(req.params.id);
        if (!ministry) {
            return res.status(404).json({ 
                success: false, 
                message: 'Ministériu la hetan.' 
            });
        }
        
        const ministryName = ministry.name;
        const ministryId = ministry.id;
        
        // Hard delete! (hamos permanente)
        await ministry.destroy();
        
        await logActivity({
            user_id: req.user.id,
            action: 'DELETE',
            entity_type: 'ministry',
            entity_id: ministryId,
            detail: `Hamos ministériu "${ministryName}"`,
            ip_address: req.ip
        });
        
        res.json({ 
            success: true, 
            message: `Ministériu "${ministryName}" hamos permanente susesu!` 
        });
    } catch (error) {
        console.error('Erro DELETE /ministries:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;

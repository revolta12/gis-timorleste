const express = require('express');
const { SiteSetting } = require('../models');
const { authenticate, authorize } = require('../middleware/auth');
const { logActivity } = require('../utils/logger');

const router = express.Router();

// GET /api/settings - Obtén konfigurasaun hotu (PUBLIK - LA PRESIZA LOGIN)
router.get('/', async (req, res) => {
    try {
        if (req.query.format === 'list') {
            const settings = await SiteSetting.findAll({ 
                order: [['updated_at', 'DESC']]
            });
            return res.json({ success: true, data: settings });
        }
        
        const settings = await SiteSetting.findAll();
        
        const defaultSettings = {
            site_name: 'GIS Timor-Leste',
            site_description: 'Sistema Informasaun Lokalizasaun Ministériu',
            contact_email: 'kontaktu@gis.tl',
            contact_phone: '+670 333 8888',
            contact_address: 'Dili, Timor-Leste',
            default_lat: '-8.55',
            default_lng: '125.57',
            default_zoom: '8',
            profile_title: 'GIS Timor-Leste - Sistema Informasaun Lokalizasaun Ministériu',
            profile_description: 'Sistema ne\'e fornese informasaun lokalizasaun ministériu sira',
            profile_photo: ''
        };
        
        settings.forEach(setting => {
            defaultSettings[setting.setting_key] = setting.setting_value;
        });
        
        res.json({ success: true, data: defaultSettings });
    } catch (error) {
        console.error('Erro settings GET:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/settings - Buat setting baru (admin only)
router.post('/', authenticate, authorize('administrator'), async (req, res) => {
    try {
        const { setting_key, setting_value, description } = req.body;
        
        if (!setting_key || !setting_value) {
            return res.status(400).json({ 
                success: false, 
                message: 'setting_key no setting_value tenke prense' 
            });
        }
        
        const setting = await SiteSetting.create({ 
            setting_key, 
            setting_value, 
            description: description || `Dibuat ${new Date().toISOString()}`
        });
        
        await logActivity({
            user_id: req.user.id,
            action: 'CREATE',
            entity_type: 'settings',
            entity_id: setting.id,
            detail: `Buat setting: ${setting_key}`,
            ip_address: req.ip
        });
        
        res.status(201).json({ success: true, data: setting });
    } catch (error) {
        console.error('Erro settings POST:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// DELETE /api/settings/:id (admin only)
router.delete('/:id', authenticate, authorize('administrator'), async (req, res) => {
    try {
        const deleted = await SiteSetting.destroy({ 
            where: { id: parseInt(req.params.id) } 
        });
        
        if (!deleted) {
            return res.status(404).json({ 
                success: false, 
                message: 'Setting la hetan' 
            });
        }
        
        await logActivity({
            user_id: req.user.id,
            action: 'DELETE',
            entity_type: 'settings',
            entity_id: parseInt(req.params.id),
            detail: `Hapus setting ID ${req.params.id}`,
            ip_address: req.ip
        });
        
        res.json({ success: true, message: 'Setting Hamos susesu!' });
    } catch (error) {
        console.error('Erro settings DELETE:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// PUT /api/settings - Atualiza settings (admin only) - FIXED VERSION
router.put('/', authenticate, authorize('administrator'), async (req, res) => {
    try {
        const updates = req.body;
        
        console.log('📝 Received updates:', updates);
        
        if (!updates || Object.keys(updates).length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: 'La iha dadus atu atualiza.' 
            });
        }
        
        for (const [key, value] of Object.entries(updates)) {
            const [setting, created] = await SiteSetting.findOrCreate({
                where: { setting_key: key },
                defaults: {
                    setting_key: key,
                    setting_value: value,
                    description: `Created on ${new Date().toISOString()}`
                }
            });
            
            if (!created) {
                await setting.update({ 
                    setting_value: value,
                    description: `Updated on ${new Date().toISOString()}`
                });
            }
        }
        
        await logActivity({
            user_id: req.user.id,
            action: 'UPDATE',
            entity_type: 'settings',
            entity_id: null,
            detail: `Atualiza konfigurasaun sistema`,
            ip_address: req.ip
        });
        
        res.json({ success: true, message: 'Konfigurasaun atualiza susesu!' });
    } catch (error) {
        console.error('❌ Erro settings PUT:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
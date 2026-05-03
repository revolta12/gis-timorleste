const express = require('express');
const { Message } = require('../models');
const { logActivity } = require('../utils/logger');

const router = express.Router();

// POST /api/contact - Haruka mensagem kontaktu
router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        if (!name || !email || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'Naran, email, no mensagem tenke prense.' 
            });
        }
        
        // Simpan iha database
        await Message.create({
            name,
            email,
            message,
            ip_address: req.ip,
            read_status: false
        });
        
        await logActivity({
            user_id: null,
            action: 'CONTACT',
            entity_type: 'message',
            entity_id: null,
            detail: `Mensagem husi ${name} (${email}): ${message.substring(0, 100)}`,
            ip_address: req.ip
        });
        
        res.json({ 
            success: true, 
            message: 'Mensagem haruka susesu! Resposta sei haruka iha loron 2-3.' 
        });
    } catch (error) {
        console.error('Erro contact:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Erro haruka mensagem.' 
        });
    }
});

module.exports = router;
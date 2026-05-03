const express = require('express');
const path = require('path');
const fs = require('fs');
const upload = require('../middleware/upload');
const { authenticate, authorize } = require('../middleware/auth');
const { logActivity } = require('../utils/logger');

const router = express.Router();

// POST /api/upload/image - Upload imajen ida
router.post('/image', authenticate, authorize('administrator', 'editor'), upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ 
                success: false, 
                message: 'La iha imajen ne\'ebé upload.' 
            });
        }
        
        const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        
        res.json({
            success: true,
            message: 'Upload susesu!',
            data: { url: fileUrl, filename: req.file.filename }
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/upload/gallery - Upload imajen barak (max 10)
router.post('/gallery', authenticate, authorize('administrator', 'editor'), upload.array('images', 10), (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: 'La iha imajen ne\'ebé upload.' 
            });
        }
        
        const files = req.files.map(file => ({
            url: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`,
            filename: file.filename
        }));
        
        res.json({
            success: true,
            message: `${files.length} imajen upload susesu!`,
            data: files
        });
    } catch (error) {
        console.error('Gallery upload error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// DELETE /api/upload/image/:filename - Hamos imajen
router.delete('/image/:filename', authenticate, authorize('administrator'), async (req, res) => {
    try {
        const filepath = path.join(__dirname, '..', 'uploads', req.params.filename);
        
        if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
        }
        
        await logActivity({
            user_id: req.user.id,
            action: 'DELETE',
            entity_type: 'file',
            entity_id: null,
            detail: `Hamos imajen: ${req.params.filename}`,
            ip_address: req.ip
        });
        
        res.json({ 
            success: true, 
            message: 'Imajen hamos susesu!' 
        });
    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
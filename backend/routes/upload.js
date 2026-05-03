const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { authenticate, authorize } = require('../middleware/auth');
const { logActivity } = require('../utils/logger');

const router = express.Router();

// Konfigurasaun Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Konfigurasaun storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'gis-timor',
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'webp']
  }
});

const upload = multer({ storage: storage });

// POST /api/upload/image - Upload imajen ida
router.post('/image', authenticate, authorize('administrator', 'editor'), upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ 
                success: false, 
                message: 'La iha imajen ne\'ebé upload.' 
            });
        }
        
        res.json({
            success: true,
            message: 'Upload susesu!',
            data: { url: req.file.path, filename: req.file.filename }
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
            url: file.path,
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
        await cloudinary.uploader.destroy(`gis-timor/${req.params.filename}`);
        
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
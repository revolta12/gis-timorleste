const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { authenticate, authorize } = require('../middleware/auth');
const { logActivity } = require('../utils/logger');

const router = express.Router();

// Konfigurasaun Cloudinary
console.log('🔍 CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('🔍 CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? '✅ Iha' : '❌ La iha');
console.log('🔍 CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? '✅ Iha' : '❌ La iha');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Testa connection
cloudinary.api.ping((err, result) => {
  if (err) console.error('❌ Cloudinary ping error:', err.message);
  else console.log('✅ Cloudinary connected:', result);
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

// POST /api/upload/image
router.post('/image', authenticate, authorize('administrator', 'editor'), upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'La iha imajen.' });
        }
        
        console.log('✅ Upload success:', req.file.path);
        
        res.json({
            success: true,
            message: 'Upload susesu!',
            data: { url: req.file.path, filename: req.file.filename }
        });
    } catch (error) {
        console.error('❌ Upload error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
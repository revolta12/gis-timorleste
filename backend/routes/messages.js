const express = require('express');
const { Message, User, ActivityLog } = require('../models');
const { authenticate, authorize } = require('../middleware/auth');
const { logActivity } = require('../utils/logger');
const nodemailer = require('nodemailer'); // Assume installed

const router = express.Router();

// GET /api/messages - List messages for admin
router.get('/', authenticate, authorize('administrator'), async (req, res) => {
  try {
    const { page = 1, limit = 10, read_status } = req.query;
    const offset = (page - 1) * limit;
    const where = {};
    if (read_status !== undefined) where.read_status = read_status === 'true';
    
    const { count, rows } = await Message.findAndCountAll({
      where,
      include: [{ model: User, as: 'admin', attributes: ['id', 'name'] }],
      order: [['created_at', 'DESC']],
      offset: parseInt(offset),
      limit: parseInt(limit)
    });

    res.json({
      success: true,
      data: { 
        messages: rows, 
        total: count, 
        page: parseInt(page), 
        totalPages: Math.ceil(count / limit) 
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/messages/:id/reply - Admin reply
router.post('/:id/reply', authenticate, authorize('administrator'), async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.id);
    if (!message) return res.status(404).json({ success: false, message: 'Message la hetan' });
    
    const { reply } = req.body;
    if (!reply) return res.status(400).json({ success: false, message: 'Resposta tenke preenche' });

    await message.update({
      reply,
      read_status: true,
      replied_at: new Date(),
      replied_by: req.user.id
    });

    // Send email to user (use site_settings for admin email)
    const siteSettings = await require('../models').SiteSetting.findOne({ where: { setting_key: 'contact_email' } });
    const adminEmail = siteSettings ? siteSettings.setting_value : 'admin@gis.tl';
    
    // TODO: Implement real nodemailer
    console.log(`Reply sent to ${message.email}: ${reply}`);

    await logActivity({
      user_id: req.user.id,
      action: 'REPLY_MESSAGE',
      entity_type: 'message',
      entity_id: message.id,
      detail: `Reply to ${message.name}: ${reply.substring(0,50)}`,
      ip_address: req.ip
    });

    res.json({ success: true, message: 'Resposta haruka susesu!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/messages/:id - Hapus message
router.delete('/:id', authenticate, authorize('administrator'), async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.id);
    if (!message) return res.status(404).json({ success: false, message: 'Message la hetan' });
    
    await message.destroy();

    await logActivity({
      user_id: req.user.id,
      action: 'DELETE',
      entity_type: 'message',
      entity_id: req.params.id,
      detail: `Hamos message from ${message.name}`,
      ip_address: req.ip
    });

    res.json({ success: true, message: 'Message hamos susesu!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/messages/:id/read - Mark as read
router.put('/:id/read', authenticate, authorize('administrator'), async (req, res) => {
  try {
    const message = await Message.findByPk(req.params.id);
    if (!message) return res.status(404).json({ success: false, message: 'Message la hetan' });
    
    await message.update({ read_status: true });

    res.json({ success: true, message: 'Mark read susesu!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

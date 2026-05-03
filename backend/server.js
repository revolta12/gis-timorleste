const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 300, message: { success: false, message: 'Demais rekestaun' } });
app.use('/api/', limiter);

const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20, message: { success: false, message: 'Barak liu tentativa login' } });

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database connection
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database konektadu!');
        await sequelize.sync({ alter: false });
        console.log('Model sincroniza!');
    } catch (error) {
        console.error('Erro database:', error);
        process.exit(1);
    }
};

// Import routes
const authRoutes = require('./routes/auth');
const ministryRoutes = require('./routes/ministries');
const categoryRoutes = require('./routes/categories');
const userRoutes = require('./routes/users');
const statsRoutes = require('./routes/stats');
const newsRoutes = require('./routes/news');
const settingRoutes = require('./routes/settings');
const logRoutes = require('./routes/logs');
const contactRoutes = require('./routes/contact');
const messagesRoutes = require('./routes/messages');
const uploadRoutes = require('./routes/upload');

// Use routes
app.use('/api/auth', loginLimiter, authRoutes);
app.use('/api/ministries', ministryRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/messages', messagesRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ success: true, status: 'ok', time: new Date().toISOString() });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Erro:', err.stack);
    res.status(err.status || 500).json({ success: false, message: err.message || 'Erro iha server laran' });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ success: false, message: `Rota '${req.originalUrl}' la hetan` });
});

// Start server
const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`
╔══════════════════════════════════════════════════════════════╗
║  GIS TIMOR-LESTE BACKEND                                     ║
║  Server iha http://localhost:${PORT}                          ║
║  API: http://localhost:${PORT}/api                            ║
╚══════════════════════════════════════════════════════════════╝
        `);
    });
};

startServer();
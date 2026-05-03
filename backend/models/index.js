const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Defini model
const Category = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    slug: { type: DataTypes.STRING(100), unique: true, allowNull: false },
    description: { type: DataTypes.TEXT },
    color: { type: DataTypes.STRING(7), defaultValue: '#3b82f6' },
    icon: { type: DataTypes.STRING(50), defaultValue: 'Building2' }
}, { tableName: 'categories', timestamps: true, underscored: true });

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(100), unique: true, allowNull: false },
    password: { type: DataTypes.STRING(255), allowNull: false },
    role: { type: DataTypes.ENUM('administrator', 'editor', 'viewer'), defaultValue: 'viewer' },
    avatar: { type: DataTypes.STRING(255) },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    last_login: { type: DataTypes.DATE }
}, { tableName: 'users', timestamps: true, underscored: true });

const Ministry = sequelize.define('Ministry', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(200), allowNull: false },
    slug: { type: DataTypes.STRING(200), unique: true, allowNull: false },
    category_id: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.TEXT },
    address: { type: DataTypes.TEXT },
    city: { type: DataTypes.STRING(100) },
    district: { type: DataTypes.STRING(100) },
    latitude: { type: DataTypes.DECIMAL(10,7) },
    longitude: { type: DataTypes.DECIMAL(10,7) },
    phone: { type: DataTypes.STRING(50) },
    email: { type: DataTypes.STRING(100) },
    website: { type: DataTypes.STRING(255) },
    photo: { type: DataTypes.STRING(255) },
    founded_year: { type: DataTypes.INTEGER },
    total_employees: { type: DataTypes.INTEGER },
    rating: { type: DataTypes.DECIMAL(3,1), defaultValue: 0 },
    total_ratings: { type: DataTypes.INTEGER, defaultValue: 0 },
    total_views: { type: DataTypes.INTEGER, defaultValue: 0 },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    created_by: { type: DataTypes.INTEGER }
}, { tableName: 'ministries', timestamps: true, underscored: true, indexes: [
    { fields: ['is_active'] },
    { fields: ['category_id'] },
    { fields: ['is_active', 'category_id'] },
    { fields: ['rating'] },
    { fields: ['created_at'] }
]});

const MinistryService = sequelize.define('MinistryService', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ministry_id: { type: DataTypes.INTEGER, allowNull: false },
    service_name: { type: DataTypes.STRING(200), allowNull: false },
    description: { type: DataTypes.TEXT }
}, { tableName: 'ministry_services', timestamps: true, underscored: true });

const MinistryGallery = sequelize.define('MinistryGallery', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ministry_id: { type: DataTypes.INTEGER, allowNull: false },
    filename: { type: DataTypes.STRING(255), allowNull: false },
    caption: { type: DataTypes.STRING(255) },
    is_primary: { type: DataTypes.BOOLEAN, defaultValue: false },
    sort_order: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { tableName: 'ministry_gallery', timestamps: true, underscored: true });

const News = sequelize.define('News', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING(255), allowNull: false },
    slug: { type: DataTypes.STRING(255), unique: true, allowNull: false },
    content: { type: DataTypes.TEXT('long') },
    excerpt: { type: DataTypes.TEXT },
    thumbnail: { type: DataTypes.STRING(255) },
    youtube_url: { type: DataTypes.STRING(500) },
    ministry_id: { type: DataTypes.INTEGER },
    author_id: { type: DataTypes.INTEGER },
    is_published: { type: DataTypes.BOOLEAN, defaultValue: false },
    published_at: { type: DataTypes.DATE }
}, { tableName: 'news', timestamps: true, underscored: true });

const FAQ = sequelize.define('FAQ', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    question: { type: DataTypes.STRING(255), allowNull: false },
    answer: { type: DataTypes.TEXT, allowNull: false },
    category: { type: DataTypes.STRING(100) },
    sort_order: { type: DataTypes.INTEGER, defaultValue: 0 },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
}, { tableName: 'faqs', timestamps: true, underscored: true });

const SiteSetting = sequelize.define('SiteSetting', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    setting_key: { type: DataTypes.STRING(100), unique: true, allowNull: false },
    setting_value: { type: DataTypes.TEXT },
    description: { type: DataTypes.TEXT }
}, { tableName: 'site_settings', timestamps: true, underscored: true });

const PageView = sequelize.define('PageView', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ministry_id: { type: DataTypes.INTEGER },
    view_date: { type: DataTypes.DATEONLY, allowNull: false },
    view_count: { type: DataTypes.INTEGER, defaultValue: 1 }
}, { tableName: 'page_views', timestamps: false, underscored: true, indexes: [
    { fields: ['ministry_id'] },
    { fields: ['view_date'] },
    { fields: ['ministry_id', 'view_date'] }
]});

const ActivityLog = sequelize.define('ActivityLog', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER },
    action: { type: DataTypes.STRING(50), allowNull: false },
    entity_type: { type: DataTypes.STRING(50) },
    entity_id: { type: DataTypes.INTEGER },
    detail: { type: DataTypes.TEXT },
    ip_address: { type: DataTypes.STRING(45) }
}, { tableName: 'activity_logs', timestamps: true, underscored: true, updatedAt: false });

const Message = sequelize.define('Message', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false },
    message: { type: DataTypes.TEXT('long'), allowNull: false },
    ip_address: { type: DataTypes.STRING(45) },
    read_status: { type: DataTypes.BOOLEAN, defaultValue: false },
    reply: { type: DataTypes.TEXT('long') },
    replied_at: { type: DataTypes.DATE },
    replied_by: { type: DataTypes.INTEGER }
}, { tableName: 'messages', timestamps: true, underscored: true });

// Associações
Category.hasMany(Ministry, { foreignKey: 'category_id' });
Ministry.belongsTo(Category, { foreignKey: 'category_id' });

User.hasMany(Ministry, { foreignKey: 'created_by', as: 'ministries' });
Ministry.belongsTo(User, { foreignKey: 'created_by', as: 'user' });

Ministry.hasMany(MinistryService, { foreignKey: 'ministry_id', as: 'services' });
MinistryService.belongsTo(Ministry, { foreignKey: 'ministry_id' });

Ministry.hasMany(MinistryGallery, { foreignKey: 'ministry_id', as: 'gallery' });
MinistryGallery.belongsTo(Ministry, { foreignKey: 'ministry_id' });

Ministry.hasMany(News, { foreignKey: 'ministry_id' });
News.belongsTo(Ministry, { foreignKey: 'ministry_id' });

User.hasMany(News, { foreignKey: 'author_id' });
News.belongsTo(User, { foreignKey: 'author_id' });

Ministry.hasMany(PageView, { foreignKey: 'ministry_id' });
PageView.belongsTo(Ministry, { foreignKey: 'ministry_id' });

User.hasMany(ActivityLog, { foreignKey: 'user_id' });
ActivityLog.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Message, { foreignKey: 'replied_by', as: 'replies' });
Message.belongsTo(User, { foreignKey: 'replied_by', as: 'admin' });

module.exports = {
    sequelize, 
    Category, 
    User, 
    Ministry, 
    MinistryService,
    MinistryGallery, 
    News, 
    FAQ, 
    SiteSetting, 
    PageView, 
    ActivityLog, 
    Message
};
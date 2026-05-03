const { ActivityLog } = require('../models');

async function logActivity({ user_id, action, entity_type, entity_id, detail, ip_address }) {
    try {
        await ActivityLog.create({ user_id, action, entity_type, entity_id, detail, ip_address });
    } catch (error) {
        console.error('Erro rejistu atividade:', error);
    }
}

module.exports = { logActivity };
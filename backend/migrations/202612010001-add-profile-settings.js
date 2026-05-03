'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert or update profile settings using UPSERT (MySQL ON DUPLICATE KEY UPDATE)
    await queryInterface.sequelize.query(`
      INSERT INTO site_settings (setting_key, setting_value, description) 
      VALUES 
        ('profile_photo', '', 'Foto profile sistema - path to /uploads/filename.jpg'),
        ('profile_title', 'GIS Timor-Leste - Sistema Informasaun Lokalizasaun Ministériu', 
         'Titulu profile sistema'),
        ('profile_description', 'Sistema Informasaun Jeneral Ministériu Timor-Leste (GIS-TL) fó fasilidade atu lokaliza ministériu sira no servisu públiku hotu iha Timor-Leste. Sistema ne\'e integra mapa interativu, informasaun detalhada, no kontaktu imediato.', 
         'Deskrisaun profile sistema')
      ON DUPLICATE KEY UPDATE
        setting_value = VALUES(setting_value),
        description = VALUES(description)
    `);
    
    console.log('✅ Profile settings seeded successfully!');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      DELETE FROM site_settings 
      WHERE setting_key IN ('profile_photo', 'profile_title', 'profile_description')
    `);
    
    console.log('✅ Profile settings removed successfully!');
  }
};
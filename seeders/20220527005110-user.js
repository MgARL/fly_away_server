const crypto = require('crypto')
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      user_id: crypto.randomUUID(),
      role: 'admin',
      name: 'John',
      last_name: 'Doe',
      password_digest: '123AFK',
      age: 69,
      address: '123 Happy St',
      city: 'MyTown',
      state: 'JK',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      user_id: crypto.randomUUID(),
      role: 'customer',
      name: 'Jhoana',
      last_name: 'Dark',
      password_digest: 'moreSecuredPss',
      age: 69,
      address: '123 UNHappy St',
      city: 'MyTown',
      state: 'JK',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};

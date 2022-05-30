const crypto = require('crypto')
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      user_id: crypto.randomUUID(),
      role: 'admin',
      name: 'Admin',
      last_name: 'Demo',
      email: 'admin@fakeEmail.com',
      password_digest: '123AFK',
      age: 35,
      address: '123 Happy St',
      city: 'MyTown',
      state: 'JK',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      user_id: crypto.randomUUID(),
      role: 'customer',
      name: 'Customer',
      last_name: 'Demo',
      email: 'custemer@fakeEmail.com',
      password_digest: 'moreSecuredPss',
      age: 53,
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

const crypto = require('crypto')
'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Customers', [{
        customer_id: crypto.randomUUID(),
         name: 'John',
         last_name: 'Doe',
         password: '123AFK',
         age: 69,
         address: '123 Happy St',
         city: 'MyTown',
         state: 'JK',
         createdAt: new Date(),
         updatedAt: new Date()
       }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Customers', null, {});
  }
};

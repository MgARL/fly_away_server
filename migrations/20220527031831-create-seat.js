'use strict';
module.exports = {
  async up(queryInterface,DataTypes) {
    await queryInterface.createTable('Seats', {
      seat_id: {
        allowNull: false,
        primaryKey: true,
        type:DataTypes.UUID
      },
      flight_id: {
        type:DataTypes.UUID,
        allowNull: false
      },
      seat_number: {
        type:DataTypes.STRING,
        allowNull: false
      },
      seat_available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      seat_type: {
        type: DataTypes.ENUM('coach', 'business','first-class'),
        defaultValue: 'coach',
      },
      seat_upcharge: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type:DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type:DataTypes.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Seats');
  }
};
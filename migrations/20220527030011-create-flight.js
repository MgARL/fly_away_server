'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Flights', {
      flight_id: {
        unique: true,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      }, 
      airline_id:{
        type: DataTypes.UUID,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: 'Airlines',
          key: 'airline_id'
        }
      },
      departure: {
        type: DataTypes.STRING,
        allowNull: false
      },
      destination: {
        type: DataTypes.STRING,
        allowNull: false
      },
      departure_time: {
        type: DataTypes.TIME,
        allowNull: false
      },
      destination_time: {
        type: DataTypes.TIME,
        allowNull: false
      },
      departure_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      destination_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      flight_price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, sequelize) {
    await queryInterface.dropTable('Flights');
  }
};
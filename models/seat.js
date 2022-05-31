'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Flight, Reservation}) {
      this.belongsTo(Flight, {
        foreignKey: 'flight_id',
        onDelete: 'CASCADE'
      })
      this.hasOne(Reservation, {
        foreignKey: 'seat_id',
        onDelete: 'CASCADE'
      })
    }
  }
  Seat.init({
    seat_id: {
      unique: true,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    flight_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    seat_number: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    seat_available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    seat_type: {
      type: DataTypes.ENUM('coach', 'business','first-class'),
      defaultValue: 'coach'
    },
    seat_upcharge:  {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Seat',
  });
  return Seat;
};
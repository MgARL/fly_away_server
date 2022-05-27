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
      this.belongsTo(Flight, {foreignKey: 'flight_id'})
      this.hasOne(Reservation, {foreignKey: 'seat_id'})
    }
  }
  Seat.init({
    seat_id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true
    },
    flight_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    seat_number: {
      type: DataTypes.STRING,
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
    seat_upcharge:  {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Seat',
  });
  return Seat;
};
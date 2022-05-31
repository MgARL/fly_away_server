'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Airline, Reservation, Seat }) {
      this.belongsTo(Airline, {
        foreignKey: 'airline_id',
        onDelete: 'CASCADE'
      })
      this.hasMany(Reservation, {
        foreignKey: 'flight_id',
        onDelete: 'CASCADE'
      })
      this.hasMany(Seat, {
        foreignKey: 'flight_id',
        onDelete: 'CASCADE'
      })
    }
  }
  Flight.init({
    flight_id: {
      unique: true,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    airline_id:{
      type: DataTypes.UUID,
      allowNull: false
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
    }
  }, {
    sequelize,
    modelName: 'Flight',
  });
  return Flight;
};
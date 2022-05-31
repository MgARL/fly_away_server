'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Flight, Seat }) {
      // define association here
      this.belongsTo(User, { 
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
      })
      this.belongsTo(Flight, { 
        foreignKey: 'flight_id',
        onDelete: 'CASCADE'
      })
      this.belongsTo(Seat, { 
        foreignKey: 'seat_id',
        onDelete: 'CASCADE'
      })

    }
  }
  Reservation.init({
    reservation_id: {
      unique: true,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    flight_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    seat_id: {
      type: DataTypes.UUID,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Reservation',
  });
  return Reservation;
};
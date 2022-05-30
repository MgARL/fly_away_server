'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airline extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Flight}) {
      this.hasMany(Flight, { foreignKey: 'airline_id'})
    }
  }
  Airline.init({
    airline_id:{
      allowNull: false,
      unique: true,
      primaryKey: true,
      type: DataTypes.UUID
    },
    airline_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Airline',
  });
  return Airline;
};
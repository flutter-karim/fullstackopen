const {Sequelize, DataTypes} = require('sequelize');

const sequelize = require('../config/database');

const User = sequelize.define('user',{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {      
      isEmail: true,        
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
},{
    timestamps: true,
    underscored: true,
  },);

  module.exports = User;
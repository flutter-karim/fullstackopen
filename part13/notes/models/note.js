const {Sequelize, DataTypes} = require('sequelize');

const sequelize = require('../config/database');

const Note = sequelize.define('note',{
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  important: {
    type: DataTypes.BOOLEAN
  },
  date: {
    type: DataTypes.DATE
  }
},{
    timestamps: false,
    underscored: true,
  },);

  module.exports = Note;
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../config/database");

const Note = sequelize.define(
  "note",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    important: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
    underscored: true,
  },
);

module.exports = Note;

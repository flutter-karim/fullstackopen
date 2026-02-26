"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ReadingList extends Model {
    static associate(models) {
      ReadingList.belongsTo(models.User, { foreignKey: "user_id" });
      ReadingList.belongsTo(models.Blog, { foreignKey: "blog_id" });
    }
  }

  ReadingList.init(
    {
      userId: DataTypes.INTEGER,
      blogId: DataTypes.INTEGER,
      read: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "ReadingList",
      tableName: "ReadingLists",
      underscored: true,
    },
  );

  return ReadingList;
};

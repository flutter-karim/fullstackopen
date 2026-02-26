"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.User.hasMany(models.Blog, { foreignKey: "user_id" });
      models.User.belongsToMany(models.Blog, {
        through: models.ReadingList,
        as: "readings",
        foreignKey: "user_id",
        otherKey: "blog_id",
      });
    }
  }
  User.init(
    {
      userName: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
    },
  );
  return User;
};

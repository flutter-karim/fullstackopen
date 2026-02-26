"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Blog.belongsTo(models.User, { foreignKey: "user_id" });

      models.Blog.belongsToMany(models.User, {
        through: models.ReadingList,
        as: "savedBy",
        foreignKey: "blog_id",
        otherKey: "user_id",
      });
    }
  }
  Blog.init(
    {
      author: DataTypes.STRING,
      url: DataTypes.STRING,
      title: DataTypes.STRING,
      likes: DataTypes.INTEGER,
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "year must be an integer" },
          min: {
            args: [1991],
            msg: "year must be at least 1991",
          },
          isNotInFuture(value) {
            const currentYear = new Date().getFullYear();
            if (value > currentYear) {
              throw new Error(`year must not be greater than ${currentYear}`);
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Blog",
      tableName: "Blogs",
    },
  );
  return Blog;
};

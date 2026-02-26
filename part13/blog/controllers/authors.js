const router = require("express").Router();
const { fn, col } = require("sequelize");

const { User, Blog } = require("../models");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    attributes: [
      ["name", "author"],
      [fn("COUNT", col("Blogs.id")), "articles"],
      [fn("SUM", col("Blogs.likes")), "likes"],
    ],
    include: {
      model: Blog,
      attributes: [],
    },
    group: ["User.id"],
    order: [[fn("SUM", col("Blogs.likes")), "DESC"]],
  });

  res.json(users);
});

module.exports = router;

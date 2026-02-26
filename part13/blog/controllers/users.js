const router = require("express").Router();

const { User, Blog, ReadingList } = require("../models");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: Blog,
  });
  res.json(users);
});

router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    return res.json(user);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res) => {
  const where = {};

  if (req.query.read) {
    where.read = req.query.read;
  }

  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ["id", "createdAt", "updatedAt"] },
    include: {
      model: Blog,
      as: "readings",
      attributes: { exclude: ["user_id", "createdAt", "updatedAt"] },
      through: { model: ReadingList, attributes: ["id", "read"], where },
    },
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

router.put("/:username", async (req, res, next) => {
  const user = await User.findOne({ where: { userName: req.params.username } });
  if (user) {
    try {
      user.userName = req.body.userName;
      await user.save();
      res.json(user);
    } catch (error) {
      next(error);
    }
  } else {
    res.status(404).end();
  }
});

module.exports = router;

const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const tokenExtractor = require("../middlewares/tokenExtractor");
const { Blog, User } = require("../models");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get("/", async (req, res) => {
  const where = {};

  if (req.query.search) {
    where[Op.or] = [
      {
        title: {
          [Op.iLike]: `%${req.query.search}%`,
        },
      },
      {
        author: {
          [Op.iLike]: `%${req.query.search}%`,
        },
      },
    ];
  }

  const blogs = await Blog.findAll({
    order: [["likes", "DESC"]],
    include: {
      model: User,
      attributes: ["name"],
    },
    where,
  });
  res.json(blogs);
});

router.post("/", tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({
      ...req.body,
      user_id: user.id,
    });
    return res.json(blog);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", blogFinder, async (req, res, next) => {
  if (req.blog) {
    try {
      req.blog.likes = req.body.likes;
      await req.blog.save();
      res.json({ likes: req.body.likes });
    } catch (error) {
      next(error);
    }
  } else {
    res.status(404).end();
  }
});

router.delete("/:id", tokenExtractor, blogFinder, async (req, res) => {
  if (req.blog) {
    if (req.blog.user_id == req.decodedToken.id) {
      await req.blog.destroy();
      res.status(204).end();
    } else {
      res
        .status(404)
        .send({ error: "You cant delete this blog beacuse you dont own it." });
    }
  } else {
    res.status(404).end();
  }
});

module.exports = router;

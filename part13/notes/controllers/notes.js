const router = require("express").Router();
const jwt = require("jsonwebtoken");

const Note = require("../models/note");
const User = require("../models/user");

const noteFinder = async (req, res, next) => {
  req.note = await Note.findByPk(req.params.id);
  next();
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  console.log(authorization);
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      console.log(authorization.substring(7));
      console.log(process.env.SECRET);
      req.decodedToken = jwt.verify(
        authorization.substring(7),
        process.env.SECRET,
      );
      console.log("------- print user by token");
      console.log(req.decodedToken);
    } catch {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

// get all notes
router.get("/", async (req, res) => {
  //   const notes = await Note.findAll();
  const notes = await Note.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name"],
    },
  });
  console.log(JSON.stringify(notes));
  res.json(notes);
});

// create new post
router.post("/", tokenExtractor, async (req, res) => {
  console.log("------- print post body");
  console.log(req.body);
  try {
    console.log("------- print start try in function");
    const user = await User.findByPk(req.decodedToken.id);
    console.log("------- print user id by token");
    console.log(req.decodedToken.id);
    console.log("------- print user by id");
    console.log(user);
    const note = await Note.create({
      ...req.body,
      userId: user.id,
      date: new Date(),
    });
    // const note = await Note.create(req.body)
    console.log(note);
    return res.json(note);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// get one note by id
router.get("/:id", noteFinder, async (req, res) => {
  //   const note = await Note.findByPk(req.params.id)
  if (req.note) {
    // console.log(note)
    console.log(req.note.toJSON());
    res.json(req.note);
  } else {
    res.status(404).end();
  }
});

// update one note
router.put("/:id", noteFinder, async (req, res) => {
  //   const note = await Note.findByPk(req.params.id)
  if (req.note) {
    req.note.important = req.body.important;
    await req.note.save();
    res.json(req.note);
  } else {
    res.status(404).end();
  }
});

// delete one note
router.delete("/:id", tokenExtractor, noteFinder, async (req, res) => {
  //   const note = await Note.findByPk(req.params.id)
  if (req.note) {
    if (req.note.userId == req.decodedToken.id) {
      await req.note.destroy();
      res.status(204).end();
    } else {
      res
        .status(404)
        .send({ error: "You cant delete this note beacuse you dont own it." });
    }
  } else {
    res.status(404).end();
  }
});

module.exports = router;

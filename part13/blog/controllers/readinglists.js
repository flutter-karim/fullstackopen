const router = require("express").Router();
const tokenExtractor = require("../middlewares/tokenExtractor");

const { ReadingList } = require("../models");

router.post("/", async (req, res, next) => {
  try {
    const { blogId, userId } = req.body;

    const entry = await ReadingList.create({
      userId,
      blogId,
    });

    res.status(201).json(entry);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", tokenExtractor, async (req, res, next) => {
  try {
    const entry = await ReadingList.findByPk(req.params.id);

    if (req.decodedToken.id != entry.user_id) {
      return res.status(404).json({ error: ["You dont own that"] });
    }
    if (!entry)
      return res.status(404).json({ error: ["reading list entry not found"] });

    entry.read = req.body.read;
    await entry.save();

    res.json({ read: req.body.read });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

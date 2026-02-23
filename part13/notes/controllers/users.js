const router = require('express').Router()

const Note = require('../models/note');
const User = require('../models/user');

// get all user
router.get('/', async (req, res) => {
//   const users = await User.findAll();
const users = await User.findAll({
    include: {
      model: Note,
        attributes: { exclude: ['userId'] }
    }
  })
    console.log(JSON.stringify(users))
  res.json(users)
})

// create new user
router.post('/', async (req, res, next) => {
    console.log(req.body);
  try {
    const user = await User.create(req.body)
    return res.json(user)
  } catch(error) {
    next(error);
  }
})

// get one user by id
router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    console.log(user.toJSON())
    res.json(user)
  } else {
    res.status(404).end()
  }
})

// update by username
router.put('/:username', async (req, res) => {
  const user = await User.findOne({ where: { username: req.params.username } });
  console.log(user);
  if (user) {
    user.username = req.body.username
    await user.save()
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router;
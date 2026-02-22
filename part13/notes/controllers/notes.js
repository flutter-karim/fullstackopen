const router = require('express').Router()

const Note = require('../models/note');

const noteFinder = async (req, res, next) => {
  req.note = await Note.findByPk(req.params.id)
  next()
}

// get all notes
router.get('/', async (req, res) => {
  const notes = await Note.findAll();
    console.log(JSON.stringify(notes))
  res.json(notes)
})

// create new post
router.post('/', async (req, res) => {
    console.log(req.body);
  try {
    const note = await Note.create(req.body)
    return res.json(note)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

// get one note by id
router.get('/:id', noteFinder, async (req, res) => {
//   const note = await Note.findByPk(req.params.id)
  if (note) {
    // console.log(note)
    console.log(note.toJSON())
    res.json(note)
  } else {
    res.status(404).end()
  }
})

// update one note
router.put('/:id', noteFinder, async (req, res) => {
//   const note = await Note.findByPk(req.params.id)
  if (note) {
    note.important = req.body.important
    await note.save()
    res.json(note)
  } else {
    res.status(404).end()
  }
})

// delete one note
router.delete('/:id', noteFinder, async (req, res) => {
//   const note = await Note.findByPk(req.params.id)
  if (note) {    
    await note.destroy()
    res.status(204).end()
  } else {
    res.status(404).end()
  }
})

module.exports = router;
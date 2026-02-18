require('dotenv').config()
const express = require('express')
const sequelize = require('./config/database');
const Note = require('./models/note');

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// get all notes
app.get('/api/notes', async (req, res) => {
  const notes = await Note.findAll();
  res.json(notes)
})

// create new post
app.post('/api/notes', async (req, res) => {
    console.log(req.body);
  try {
    const note = await Note.create(req.body)
    return res.json(note)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

// get one note by id
app.get('/api/notes/:id', async (req, res) => {
  const note = await Note.findByPk(req.params.id)
  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

// update one note
app.put('/api/notes/:id', async (req, res) => {
  const note = await Note.findByPk(req.params.id)
  if (note) {
    note.important = req.body.important
    await note.save()
    res.json(note)
  } else {
    res.status(404).end()
  }
})

const PORT = process.env.PORT || 9988

// sequelize.sync({ force: true });
sequelize.sync();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
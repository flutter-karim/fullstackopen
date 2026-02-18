require('dotenv').config()
const express = require('express')
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

const PORT = process.env.PORT || 9988
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
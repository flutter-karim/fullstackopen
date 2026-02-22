require('dotenv').config()
const express = require('express')
const sequelize = require('./config/database');
const notesRouter = require('./controllers/notes')
const Note = require('./models/note');

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/notes', notesRouter)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'id is required' })
  } 

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 9988

// sequelize.sync({ force: true });
sequelize.sync();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
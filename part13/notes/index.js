require('dotenv').config()
const express = require('express')
const sequelize = require('./config/database');
const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const Note = require('./models/note');
const User = require('./models/user');

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'id is required' })
  } 

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 9988

User.hasMany(Note)
Note.belongsTo(User)
// sequelize.sync({ force: true });
sequelize.sync();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
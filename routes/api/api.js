const usersRouter = require('./users');
const coursesRouter = require('./courses')
const notesRouter = require('./notes')

module.exports = [
  usersRouter,
  coursesRouter,
  notesRouter
];
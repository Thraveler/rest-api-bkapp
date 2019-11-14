const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  title: String,
  content: String,
  userId: String
},
{
  timestamps: {}
});

module.exports = mongoose.model('Note', noteSchema)
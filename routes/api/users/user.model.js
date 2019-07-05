const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  lastName: String,
  age: Number,
},
{
  timestamps: {}
});

module.exports = mongoose.model('User', userSchema);
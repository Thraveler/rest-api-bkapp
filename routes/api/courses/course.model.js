const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  courseName: String,
  information: String,
  imagePath: String
}, {
  timestamps: {}
});

module.exports = mongoose.model('Course', courseSchema);
const CourseModel = require('./course.model');
const mongoose = require('mongoose');

function getCourses() {
  return CourseModel
    .find()
    .select( 
      'courseName information imagePath profesor duration startDate endDate'
      )
    .exec();
}

function createCourse(request) {
  
  const course = new CourseModel({
    _id: mongoose.Types.ObjectId(),
    courseName: request.body.courseName,
    information: request.body.information,
    imagePath: request.file.path
  });

  return course.save();

}

function getCourse(idCourse) {
  return CourseModel
    .findById(idCourse)
    .select( 
      'courseName information imagePath'
      )
    .exec();
}

function deleteCourse(idCourse) {
  return CourseModel.findByIdAndRemove(idCourse).exec();
}

module.exports = {
  getCourses,
  createCourse,
  getCourse,
  deleteCourse
}
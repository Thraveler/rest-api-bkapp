const UserModel = require('./user.model');
const mongoose = require('mongoose');

function getUsers() {
  return UserModel.find().exec();
}

function createUser() {
  
  const user = new UserModel({
    _id: mongoose.Types.ObjectId(),
    name: 'User',
    lastName: '1',
    age: 23
  });

  return user.save();

}

function getUser(idUser) {
  return UserModel.findById(idUser).exec();
}

function deleteUser(idUser) {
  return UserModel.findByIdAndRemove(idUser).exec();
}

module.exports = {
  getUsers,
  createUser,
  getUser,
  deleteUser
}
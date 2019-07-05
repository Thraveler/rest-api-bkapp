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

module.exports = {
  getUsers,
  createUser
}
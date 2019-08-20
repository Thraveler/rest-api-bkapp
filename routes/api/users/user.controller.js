const UserModel = require('./user.model');
const mongoose = require('mongoose');

function getUsers() {
  return UserModel
    .find()
    .select(
      'username name lastName email age'
    )
    .exec();
}

function createUser(userReceived) {
  
  const user = new UserModel({
    _id: mongoose.Types.ObjectId(),
    username: userReceived.username,
    name: userReceived.name,
    lastName: userReceived.lastName,
    email: userReceived.email,
    age: userReceived.age
  });

  return user.save();

}

function getUser(idUser) {
  return UserModel
    .findById(idUser)
    .select(
      'username name lastName email age'
    )
    .exec();
}

function deleteUser(idUser) {
  return UserModel.findByIdAndRemove(idUser).exec();
}

function updateUser(idUser, userUpdated) {
  return UserModel.findByIdAndUpdate(idUser, userUpdated).exec();
}

module.exports = {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser
}
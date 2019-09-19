const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: { 
    type: String, 
    // required: true,
    // unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ 
  },
  password: { 
    type: String, 
    // required: true 
  },
  name: String,
  lastName: String,
  age: Number,
  numberPhone: Number,
  profileImage: String
},
{
  timestamps: {}
});

module.exports = mongoose.model('User', userSchema);
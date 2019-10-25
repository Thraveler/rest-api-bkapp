let express = require('express');
let router = express.Router();
const userModel = require('../../api/users/user.model');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const http = require('http');
const FormData = require('form-data')

router.post('/signup', (req, res) => {

  const { username, email, password } = req.body;

  let form = new FormData()
  form.append('em', email);
  form.append('usr', username);
  form.append('des', 'yes');
  form.append('url', '132.248.115.45');
  form.append('verify', 'X/12p9@#%8uc43r');

  
  bcrypt.hash(password, saltRounds, (err, hash) => {
    
    if(err) res.send(500).json({ 
      code: 500,
      message: "Server error",
      error: err
    });
    
    const account = new userModel({
      _id: mongoose.Types.ObjectId(),
      username: username,
      email: email,
      password: hash
    });
    
    account.save()
    .then(account => {
      // Se envian datos a servidor para permitir chat en el app
      // form.submit('http://132.248.115.34:80', function(err, res) {
      //   if (err) throw err;
      //   console.log('Done');
      // });
      res.status(201).json({
          message: "User created",
          code: 201
        });
      })
      .catch(err => {
        res.status(500).json({
          code: 500,
          message: "Server error",
          error: err
        });
      });
  });

});

router.post('/login', (req, res) => {

  console.log(req.body);
  const { username, password } = req.body;

  userModel.findOne({username: username}, (err, user) => {
    if(err) return res.status(500).json({
      code: 500,
      message: "Server error",
      error: err
    });

    if(!user) return res.status(401).json({ 
      code: 401,
      message: 'Auth error doesnt exist user' 
    });

    bcrypt.compare(password, user.password, (err, result) => {

      if(err) res.status(500).json({
        // code: 500,
        message: "Server error",
        error: err
      });

      if(result) {
        res.status(200).json({ 
          message: 'You are login', 
          code: 200,
          userId: user._id,
          username: user.username,
          email: user.email
        });
      } else {
        res.status(401).json({
          code: 401,
          message: "Server error",
          message: 'Auth error not match'
        });
      }
    });
  });

});

module.exports = router;
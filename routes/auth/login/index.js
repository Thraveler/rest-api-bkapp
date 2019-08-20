let express = require('express');
let router = express.Router();
const userModel = require('../../api/users/user.model');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;


router.post('/signup', (req, res) => {

  const { username, email, password } = req.body;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    
    if(err) res.send(500).json({ error: err});

    const account = new userModel({
      _id: mongoose.Types.ObjectId(),
      username: username,
      email: email,
      password: hash
    });

    account.save()
      .then(account => {
        res.status(201).json(account);
      })
      .catch(err => {
        res.status(500).json({error: err});
      });
  });

});

router.post('/login', (req, res) => {

  console.log(req.body);
  const { username, password } = req.body;

  userModel.findOne({username: username}, (err, user) => {
    if(err) return res.status(500).json({error: err});

    if(!user) return res.status(401).json({ message: 'Auth error doesnt exist user' });

    bcrypt.compare(password, user.password, (err, result) => {

      if(err) res.status(500).json({error: err});

      if(result) {
        res.status(200).json({ message: 'You are login', code: 200 });
      } else {
        res.status(200).json({message: 'Auth error not match'});
      }
    });
  });

});

module.exports = router;
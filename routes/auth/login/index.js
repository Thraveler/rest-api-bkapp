let express = require('express');
let router = express.Router();
const userModel = require('../../api/users/user.model');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const nodemailer = require('nodemailer');

// Configuraciones para enviar mails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bkapp.sti@gmail.com ',
    pass: 'bkappeslaley'
  }
});

let mailOptions = {
  from: 'bkapp.sti@gmail.com',
  to: '',
  subject: 'Recuperacion de Contraseña',
  text: ''
};

function mandarCorreo(destino, pass) {

  mailOptions.to = destino;
  mailOptions.text = 'Se ha realizado una solicitud de cambio de contraseña, su nueva contraseña es :        ' + pass  + '        . Si desea cambiarla ingrese a su cuenta.'

  transporter.sendMail(mailOptions, (error, info) => {
      if(error){
          console.log(error);
      } else {
          console.log('Email sent: '+ info.response);
      }
  });

}
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
      form.submit('http://132.248.115.34:80', function(err, res) {
        if (err) throw err;
        console.log('Done');
      });
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
        code: 500,
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

router.post('/recovery', (req, res) => {

  let query = { email: req.body.email };
  let password = generarpassw();

  bcrypt.hash(password, saltRounds, (err, hash) => {

    if(err) res.send(500).json({ 
      code: 500,
      message: "Error mientras se generaba contraseña.",
      error: err
    });
    
    userModel.findOneAndUpdate(
      query, 
      { $set: { password: hash }},
      (err, doc) => {
        // Si hubo un error interno
        if(err) {
          res.status(500).json({
            statusCode: 500,
            message: 'Hubo un error al actualizar contraseña',
            error: err
          })
        } else {
          // Sino hubo error pero no se encontro email
          if(!doc) {
            res.status(404).json({
              statusCode: 404,
              message: 'No hay coincidencia'
            });
          } else {
            mandarCorreo(query.email, password)
    
            res.status(200).json({
              statusCode: 200,
              message: 'Correo enviado'
            });
          }
        }
      });

  });

});

router.post('/updatePassword', (req, res) => {

  let { email, password, newPassword } = req.body;

  // Se busca el usuario en base al email
  userModel.findOne(
    { email: email },
    (err, user) => {

      // Si da error interno
      if(err) return res.status(500).json({
        code: 500,
        message: "Server error",
        error: err
      });
  
      // Sino se encontro el usuario
      if(!user) return res.status(401).json({ 
        code: 401,
        message: 'Auth error doesnt exist user' 
      });

      // Se comparan contraseñas antes de hacer cambios
      bcrypt.compare(password, user.password, (err, result) => {

        // Error interno
        if(err) res.status(500).json({
          code: 500,
          message: "Server error",
          error: err
        });
  
        // Si las contraseñas son iguales se actualiza
        if(result) {
          
          bcrypt.hash(newPassword, saltRounds, (err, hash) => {

            if(err) res.send(500).json({ 
              code: 500,
              message: "Error mientras se generaba contraseña.",
              error: err
            });
            
            userModel.findOneAndUpdate(
              { email: email }, 
              { $set: { password: hash }},
              (err, doc) => {
                // Si hubo un error interno
                if(err) {
                  res.status(500).json({
                    statusCode: 500,
                    message: 'Hubo un error al actualizar contraseña',
                    error: err
                  })
                } else {
                  // Sino hubo error pero no se encontro email
                  if(!doc) {
                    res.status(404).json({
                      statusCode: 404,
                      message: 'No hay coincidencia'
                    });
                  } else {
                    mandarCorreo(email, newPassword)
            
                    res.status(200).json({
                      statusCode: 200,
                      message: 'Contraseña actualizada'
                    });
                  }
                }
              });
        
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

function generarpassw() {

  let pass = ''

  for(let x = 0; x <= 9; x++){
      var c = Math.random() * (126 - 48) + 48;
      pass += String.fromCharCode(c);
  }
  return pass;
}

module.exports = router;
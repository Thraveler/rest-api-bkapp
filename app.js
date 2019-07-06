const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Database connection
mongoose.connect(
		'mongodb://localhost:27017/bkapp', 
		{useNewUrlParser: true},
		(err) => {
			if(err) {
				console.error(err);
			} else {
				console.log('Connection to database successfully!');
			}
		}
	);

// Muestra en consola las peticiones http
app.use(morgan('dev'));

// Traduce cuerpo de peticiones http
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Configurando rutas
const apiRoutes = require('./routes/api/api');
const authRoutes = require('./routes/auth/auth');

app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

app.use((req, res, next) => {
	let err = new Error('Route not found!');
	err.status = 404;
	
	next(err);
});

app.use((err, req, res, next) => {

	res.status(err.status || 500).json({
		error: {
			message: err.message
		}
	});

});


module.exports = app;

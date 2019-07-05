const express = require('express');
const app = express();
const mongoose = require('mongoose');

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

const apiRoutes = require('./routes/api/api');

app.use('/api', apiRoutes);

app.use((req, res, next) => {
	let err = new Error('Route not found!');
	err.status = 404;
	
	next(err);
});

app.use((err, req, res, next) => {
	res.status(err.status || 500);

	res.json({
		error: {
			message: err.message
		}
	});
});


module.exports = app;

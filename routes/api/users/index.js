const express = require('express');
const router = express.Router();
const userController = require('./user.controller');

router.get('/users', (req, res) => {
	
	userController.getUsers()
		.then(docs => {
			res.status(200).json(docs);
		})
		.catch();
	// res.status(200).json({
	// 	message: 'GET to /users'
	// });
});

router.post('/users', (req, res) => {

	userController.createUser()
		.then(user => {
			res.status(201).json(user);
		})
		.catch()

	// res.status(200).json({
	// 	message: 'POST to /users'
	// });
});

router.delete('/users/:id', (req, res) => {
	res.status(200).json({
		message: 'DELETE to /users/' + req.params.id
	});
});

router.patch('/users/:id', (req, res) => {
	res.status(200).json({
		message: 'PATCH to /users/' + req.params.id
	});
});

module.exports = router;

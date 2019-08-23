const express = require('express');
const router = express.Router();
const userController = require('./user.controller');

/* 
	HTTP Methods - /api/users
*/

// GET
router.get('/users', (req, res) => {
	
	userController.getUsers()
		.then(users => {
			res.status(200).json(users);
		})
		.catch();

});

// POST
router.post('/users', (req, res) => {

	userController.createUser(req.body)
	.then(user => {
			res.status(201).json(user);
		})
		.catch(err => {
			res.status(500).json({error: err});
		});

});

/* 
	HTTP Methods - /api/users/:id
*/

// GET
router.get('/users/:idUser', (req, res) => {

	let userId = req.params.idUser;

	userController.getUser(userId)
		.then(user => {
			res.status(200).json(user);
		})
		.catch();

});

// DELETE
router.delete('/users/:idUser', (req, res) => {

	let userId = req.params.idUser;

	userController.deleteUser(userId)
		.then(result => {
			if(!result) res.status(200).json({message: 'User not found'});

			res.status(200).json({message: `User with id ${result._id} deleted.`});
		})
		.catch(err => {
			res.status(500).json({
				error: err
			});
		});

});

// PATCH
router.put('/users/:idUser', (req, res) => {
	let userId = req.params.idUser;

	let user = {
		username: req.body.username,
		name: req.body.name || "",
		lastName: req.body.lastName || "",
		email: req.body.email || "",
		age: req.body.age || 0
	}

	userController.updateUser(userId, user)
		.then(updated => {
			res.status(201).json({
				message: "Datos actualizados",
				code: 200
			});
		})
		.catch();

});

module.exports = router;

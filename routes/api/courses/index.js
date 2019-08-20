const express = require('express');
const router = express.Router();
const multer = require('multer');
const courseController = require('./courses.controller');

const storage = multer.diskStorage({
  // Dónde se alamacenará la imagen
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  // Como se nombrará la imagen
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

// Función que determina si una imagen será o no aceptada
function fileFilter (req, file, cb) {

  let mimetype = file.mimetype;

  // Verifica que sea jpeg o png, en caso contrario se rechaza
  if(mimetype === 'image/jpeg' || mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer({ 
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter 
  });

/*
	HTTP Methods - /api/courses
*/

// GET
router.get('/courses', (req, res) => {

  courseController.getCourses()
    .then(courses => {
      res.status(200).json(courses);
    })
    .catch();

});

// POST
router.post('/courses', upload.single('profileImage'), (req, res) => {

// console.log(req.file);

// res.status(201).json({message: "Post image"});

  courseController.createCourse(req)
    .then(course => {
      res.status(201).json(course);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });

});

/* 
	HTTP Methods - /api/courses/:id
*/

// GET
router.get('/courses/:idCourse', (req, res) => {

	let courseId = req.params.idCourse;

	courseController.getCourse(courseId)
		.then(course => {
			res.status(200).json(course);
		})
		.catch();

});

// DELETE
router.delete('/courses/:idCourse', (req, res) => {

	let courseId = req.params.idCourse;

	courseController.deleteCourse(courseId)
		.then(result => {
			if(!result) res.status(200).json({message: 'Course not found'});

			res.status(200).json({message: `Course with id ${result._id} deleted.`});
		})
		.catch(err => {
			res.status(500).json({
				error: err
			});
		});

});

module.exports = router;
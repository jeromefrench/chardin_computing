const express = require('express');
var router = express.Router();
const fs = require('fs');
const db = require(SRC + '/config/database.js');
const { check, validationResult } = require('express-validator')
const Podcast = require(SRC + '/model/podcast.js')
const multer  = require('multer');



let getPodcast = function async(req, res){
	console.log("hello");
	Podcast.findAll()
	.then((podcasts) => {
		res.send(podcasts);
	})
	.catch(err => {
		console.log(err);
	})
}


	let validationPostRules = function(){
		return [
			check('title').isString().bail().isLength({min: 1, max: 255}),
			check('pathName').isString().bail().isLength({min: 1, max: 255}),
			check('date').isISO8601(),
			check('country').isString().bail().isLength({min: 1, max: 255}),
		//	check('description'),
		]
	}

	let validate = function(req, res, next){
		console.log(req.body);
		const errors = validationResult(req)
		if (errors.isEmpty()) {
			return next()
		}
		const extractedErrors = []
		errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
		return res.status(423).json({
			errors: extractedErrors,
		})
	}



	let postPodcast = function async(req, res){
		console.log("&&&&&&&&&&&&&&");
		console.log(req.body);
		console.log(req.files);
		let {title, pathName, date, country, description} =  req.body;
		Podcast.build({title, pathName, date, country,description}).save();
		res.send(req.body);
	}

let testa = multer({dest:'uploads/'}).any();


let middlewarePost = [
	testa,
	validationPostRules(),
	validate
]


router.get("/", getPodcast);
router.post('/', middlewarePost,  postPodcast);



 module.exports = router;






// module.exports = class homeController {








	// static listPodcast(req, res){
	// 	var podcastFolder = SRC + '/public/podcast';
	// 	console.log(podcastFolder);
	// 	fs.readdir(podcastFolder, (err, files) => {
	// 		res.send(files);
	// 	});
	// }




	// static testtest () {
	// 	return function (req, res) {
	// 		// Implement the middleware function based on the options object
	// 		multer({dest:'uploads/'}).any();
	// 	}
	// }





	//static validationFileRules(req, res, next){
	//	multer({
	//		dest:'uploads/',
	//		fileFilter: function (req, file, cb) {

	//			// The function should call `cb` with a boolean
	//			// to indicate if the file should be accepted

	//			// To reject this file pass `false`, like so:
	//			//cb(null, false)

	//			// To accept the file pass `true`, like so:
	//			cb(null, true)

	//			// You can always pass an error if something goes wrong:
	//			//cb(new Error('I don\'t have a clue!'))

	//		},
	//		limits : {fileSize: 100000000000, files: 1}
	//	}).any();
	//	return next();
	//}

// }

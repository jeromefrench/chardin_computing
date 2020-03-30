const router = require('express').Router();
const { check, validationResult } = require('express-validator')
const multer  = require('multer');

const controller = require(SRC +'/controller/index.js');
const midleware = require(SRC +'/utils/middleware/index.js');

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


let testa = multer({dest:'uploads/'}).any();

let middlewarePost = [
	testa,
	validationPostRules(),
	validate
]

router.get("/", controller.podcast.list);
router.post('/', middlewarePost,  controller.podcast.create);

module.exports = router;














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

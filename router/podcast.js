const router = require('express').Router();
const controller = require(SRC +'/controller/index.js');
const midleware = require(SRC +'/utils/middleware/index.js');

let middlewarePost = [
	midleware.podcast.testa,
	midleware.podcast.validationPostRules(),
	midleware.podcast.validate
]

router.get('/', controller.podcast.list);
router.post('/', middlewarePost,  controller.podcast.create);

module.exports = router;

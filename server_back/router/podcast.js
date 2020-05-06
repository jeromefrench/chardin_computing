const router = require('express').Router();
const controller = require(SRC +'/controller/index.js');
const midleware = require(SRC +'/utils/middleware/index.js');

let middlewarePost = [
	midleware.podcast.testa,
	midleware.podcast.validationPostRules(),
	midleware.podcast.validate,
	midleware.podcast.auth
]

router.get('/:idi',
	controller.podcast.get);

router.get('/',
	controller.podcast.list);

router.put('/:idi',
	midleware.podcast.auth,
	controller.podcast.update);

router.post('/',
	middlewarePost,
	controller.podcast.create);

router.delete('/',
	midleware.podcast.auth,
	controller.podcast.delete);

module.exports = router;

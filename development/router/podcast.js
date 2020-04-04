const router = require('express').Router();
const controller = require(SRC +'/controller/index.js');
const midleware = require(SRC +'/utils/middleware/index.js');

let middlewarePost = [
	midleware.podcast.testa,
	midleware.podcast.validationPostRules(),
	midleware.podcast.validate
]

router.get('/:idi', controller.podcast.get);
router.get('/', controller.podcast.list);
router.put('/:idi', controller.podcast.update);
router.post('/', middlewarePost,  controller.podcast.create);
router.delete('/', controller.podcast.delete);

module.exports = router;

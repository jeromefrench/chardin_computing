const router = require('express').Router();
const controller = require(SRC +'/controller/index.js');
const midleware = require(SRC +'/utils/middleware/index.js');
const passport = require('passport');

router.get('/',
	controller.users.getProfile);

router.post('/',
	midleware.user.validationPostRules(),
	midleware.user.validate,
	controller.users.create);

router.post('/sign-in',
	midleware.user.validationSignInRules(),
	midleware.user.validate,
	controller.users.signIn);

router.get('/sign-out',
	controller.users.signOut);

router.get('/fail',
	controller.users.fail)

module.exports = router;

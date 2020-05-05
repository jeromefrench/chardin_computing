const router = require('express').Router();
const controller = require(SRC +'/controller/index.js');
const midleware = require(SRC +'/utils/middleware/index.js');
const passport = require('passport');

let authentic = passport.authenticate('local',{ failureRedirect: '/fail' });

router.get('/', controller.users.getProfile);
router.post('/', controller.users.create);
router.post('/sign-in', authentic, controller.users.signIn);
router.get('/sign-out', controller.users.signOut);

module.exports = router;

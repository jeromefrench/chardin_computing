const router = require('express').Router();
const controller = require(SRC +'/controller/index.js');
const midleware = require(SRC +'/utils/middleware/index.js');
const passport = require('passport');





let authentic = passport.authenticate('local',{ failureRedirect: '/fail' });




router.post('/sign-in', authentic, controller.users.signIn);
router.get('/', controller.users.getProfile);
router.post('/', controller.users.create);


module.exports = router;

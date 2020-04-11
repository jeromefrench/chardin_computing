const router = require('express').Router();
const controller = require(SRC +'/controller/index.js');
const midleware = require(SRC +'/utils/middleware/index.js');



router.post('/sign-in', controller.users.signIn);
router.get('/', controller.users.getProfile);
router.post('/', controller.users.create);


module.exports = router;

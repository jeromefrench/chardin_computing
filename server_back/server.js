require('module-alias/register');
require('dotenv').config();
const express = require('express');
const multer  = require('multer');
const app = express();
const router = require('@root/router/index.js');
const midleware = require('@root/utils/middleware/index.js');
const myPassport = require('@root/utils/middleware/passport.js');

/*DATA BASE*/
const db = require('@root/config/database.js');
//db.sync({alter: true}); //to create the db


/*MIDDLEWARE*/
app.use('/static', express.static(process.env.ASSETS_PATH));
app.use(midleware.server);
app.use(myPassport);


/*ROUTE*/
app.options("/*",function(req, res){ res.status(200).send('options call'); });
app.get('/test', (req, res) => { res.send('test back'); });
app.use('/podcast', router.podcast);
app.use('/user', router.users);

app.get('/connected', (req, res) => {
	if (req.user){
		res.send(true);
	}
	else {
		res.send(false);
	}
})


/*ERROR*/
app.use(function (err, req, res, next) {
	console.log("***************error**********************");
  	if (err instanceof multer.MulterError) res.status(501).send(err.message);
  	else next(err);
});

const PORT = process.env.BACK_PORT || 3000;
console.log(`Server back listening on port ${PORT}`);
app.listen(PORT);


//for testing
module.exports = app;

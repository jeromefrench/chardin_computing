SRC = __dirname;
require('dotenv').config();
const express = require('express');
const multer  = require('multer');
const app = express();
const router = require(SRC +'/router/index.js');
const midleware = require(SRC +'/utils/middleware/index.js');
const myPassport = require(SRC +'/utils/middleware/passport.js');

/*DATA BASE*/
const db = require(SRC + '/config/database.js');
//db.sync({alter: true}); //to create the db


/*MIDDLEWARE*/
app.use('/static', express.static(process.env.ASSETS_PATH));
app.use(midleware.server);
app.use(myPassport);
app.use(function(req, res, next){
	// console.log("***************$*******************");
	// console.log(req.url);
	// console.log(req.method);
	next();
})

app.options("/*",function(req, res){
	console.log("options call");
	res.send(200);
});

/*ROUTE*/
app.get('/fail', (req, res) => { res.send('fail to log'); });
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
app.on('ready', function() { 
    // app.listen(3000, function(){ 
        console.log("app is ready"); 
    // }); 
});





//for testing
module.exports = app;

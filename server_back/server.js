SRC = __dirname;
require('dotenv').config();
const express = require('express');
const multer  = require('multer');
const app = express();
const router = require(SRC +'/router/index.js');
const midleware = require(SRC +'/utils/middleware/index.js');
const bodyParser = require('body-parser');

var cookieSession = require('cookie-session');
var cookieParser = require('cookie-parser');
app.use(cookieParser());
const passport = require('passport');


app.use(cookieParser('Arman.D'));
app.use(cookieSession({
	maxAge: 30 * 24 * 60 * 60 * 1000,
	keys: ['Arman.D']
}));






app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

const User = require(SRC + '/model/users.js')

passport.serializeUser((user, done)=> {
	console.log("on serialize");
	console.log(user);
	console.log(user.id);
  	done(null, user.id);
});

passport.deserializeUser(async (id, done)=> {
	console.log("on deserialize");

	try {
    	let user = await User.findOne({where: { id: id }});
		console.log(id);
    	done(false, user.dataValues);

	} catch (e) {
		/* handle error */
		console.log(e);
	}
});



LocalStrategy = require('passport-local').Strategy;

app.use(function(req, res, next){
	console.log("***********************************");
	console.log("***********************************");
	console.log("***********************************");
	console.log("***********************************");
	console.log(req.url);
	console.log("***********************************");
	console.log("***********************************");
	console.log("***********************************");
	console.log("ya kk1");

	console.log(req.session.id);
	//	console.log(req.session);
	next();
})


passport.use('local', new LocalStrategy(
	{
    	usernameField: 'mail',
    	passwordField: 'password'
  	},
  	async function(username, password, done) {
      	console.log("strat local");

		var verifyPassword = function () {
        	//return bCrypt.compareSync(password, userpass);
        	console.log("On verifie le password");
    		return true;
    	}
      	console.log("strat local");

    	let user = await User.findOne({where: { mail: username }});
      	// if (err) {
      	// 	  console.log(err);
      	// 	  return done(err); }
      	if (user == null) {
      	  	console.log("pas de user");
      	  	return done(null, false, { message: 'Incorrect username.' } );
      	}
      	//if (!user.verifyPassword(password)) { return done(null, false); }
      	if (!verifyPassword()) {
      	  	console.log("on verigy");
      	  	return done(null, false, { message: 'Incorrect paswd.' }); 
      	}
      	console.log("c'est ok");
      	console.log(user.dataValues);
      	return done(null, user.dataValues);
  	}
));



/*DATA BASE*/
const db = require(SRC + '/config/database.js');
db.sync({alter: true});

/*MIDDLEWARE*/
// app.use('/static', express.static(SRC + '/public'));
// console.log(process.env.ASSETS_PATH);
// app.use('/static', express.static(process.env.ASSETS_PATH));
app.use(midleware.server);



app.options("/*",function(req, res){
	console.log("options call");
	res.send(200);
});


/*ROUTE*/
app.get('/fail', (req, res) => {
	res.send('fail to log');
})
app.get('/test', (req, res) => { res.send('test back'); });
app.use('/podcast', router.podcast);
app.use('/user', router.users);







/*ERROR*/
app.use(function (err, req, res, next) {
	console.log("***************error**********************");
  	if (err instanceof multer.MulterError) res.status(501).send(err.message);
  	else next(err);
});

const PORT = process.env.BACK_PORT || 3000;
console.log(`Server back listening on port ${PORT}`);
app.listen(PORT);

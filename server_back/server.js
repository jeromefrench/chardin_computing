SRC = __dirname;
require('dotenv').config();
const express = require('express');
const multer  = require('multer');
const app = express();
const router = require(SRC +'/router/index.js');
const midleware = require(SRC +'/utils/middleware/index.js');

const passport = require('passport');

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

LocalStrategy = require('passport-local').Strategy;

const User = require(SRC + '/model/users.js')


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
      	  return done(null, false); }
      //if (!user.verifyPassword(password)) { return done(null, false); }
      if (!verifyPassword()) {
      	  console.log("on verigy");
      	  return done(null, false); }
      	console.log("c'est ok");
      return done(null, user);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({id: id}, function(err, user) {
    done(err, user);
  });
});


/*DATA BASE*/
const db = require(SRC + '/config/database.js');
db.sync({alter: true});

/*MIDDLEWARE*/
app.use('/static', express.static(SRC + '/public'));
console.log(process.env.ASSETS_PATH);
app.use('/static', express.static(process.env.ASSETS_PATH));
app.use(midleware.server);

/*ROUTE*/
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

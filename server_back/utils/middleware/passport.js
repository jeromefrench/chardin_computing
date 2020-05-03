console.log("ici passport");
const passport = require('passport');
var cookieSession = require('cookie-session');
var cookieParser = require('cookie-parser');
LocalStrategy = require('passport-local').Strategy;

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
      	// console.log(user.dataValues);
      	return done(null, user.dataValues);
  	}
));

module.exports = [
	cookieParser('jchardin'),
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: ['jchardin']
	}),
	passport.initialize(),
	passport.session(),
]






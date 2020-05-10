const passport = require('passport');
var cookieSession = require('cookie-session');
var cookieParser = require('cookie-parser');
LocalStrategy = require('passport-local').Strategy;

const User = require('@root/model/users.js')

passport.serializeUser((user, done)=> {
	done(null, user.id);
});

passport.deserializeUser(async (id, done)=> {
	try {
		let user = await User.findOne({where: { id: id }});
		// console.log(id);
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
		var verifyPassword = function () {
			//return bCrypt.compareSync(password, userpass);
			if (user.dataValues.password == password)
				return true;
			else
				return false;
		}

		let user = await User.findOne({where: { mail: username }});

		// if (err) {
		// 	console.log(err);
		// 	return done(err);
		// }
		if (user == null) {
			return done(null, false, { message: 'wrong mail' } );
		}
		if (!verifyPassword(user, password)) {
			return done(null, false, { message: 'wrong password' });
		}
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






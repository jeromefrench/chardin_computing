const express = require('express');
const User = require(SRC + '/model/users.js')
const passport = require('passport');

module.exports = class controlerUsers{

	static async create(req, res){
		let {pseudo, mail, password} = req.body;
		const user = await User.build({pseudo, mail, password}).save();
		res.status(201).send(user.dataValues);
	}

	static async getProfile(req, res){
		res.status(200).send(req.user);
	}

	static async signIn(req, res, next){
		//req.session.save(function(){
		//});

		passport.authenticate('local', function(err, user, info) {
			if (err) { return next(err); }
			if (!user) { 
				res.status(400).send({error: info.message});
				return;
			}
			res.status(200).send(user);
			return next();
		})(req, res, next);
	}

	static async signOut(req, res){
		req.logout();
		res.status(200).send('You sign out');
	}

	static async fail(req, res){
		res.status(401).send('fail to log');
	}

}

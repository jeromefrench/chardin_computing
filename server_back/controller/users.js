const express = require('express');
const User = require('@root/model/users.js')
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
		// req.session.save(function(){
		// });

		passport.authenticate('local', function(err, user, info) {
			if (err) {
				console.log(err);
				return next(err);
			}
			if (!user) {
				res.status(400).send({error: info.message});
				return;
			}
			else{
				req.login(user, function (err) {
					if(err) {
						console.log(err);
						return;
					}
					res.status(200).send(user);
					// res.redirect('/');
				});
			}
			// return next();
		})(req, res, next);

		// console.log("ico ico");
		// res.send("okiiiiiiii");
	}

	static async signOut(req, res){
		req.logout();
		res.status(200).send('You sign out');
	}

	static async fail(req, res){
		console.log("ici fail");
		res.status(401).send('fail to log');
	}

}

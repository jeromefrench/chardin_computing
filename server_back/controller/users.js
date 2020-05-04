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
		console.log(req.user);
		res.send(req.user);
	}

	static async signIn(req, res){
		//req.session.save(function(){
			res.status(200).send(req.user);
		//});
	}

}

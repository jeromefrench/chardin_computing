const express = require('express');
const User = require(SRC + '/model/users.js')
const passport = require('passport');

module.exports = class controlerUsers{

	static async create(req, res){
		let {pseudo, mail, password} = req.body;
		User.build({pseudo, mail, password}).save();
		console.log(req.body);
		res.send(req.body);
	}

	static async getProfile(req, res){
		console.log(req.user);
		res.send(req.user);
	}

	static async signIn(req, res){
		//req.session.save(function(){
			console.log(req.user);
			res.send(req.user);
		//});
	}

}

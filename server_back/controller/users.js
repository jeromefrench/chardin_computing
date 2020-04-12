const express = require('express');
const User = require(SRC + '/model/users.js')
const passport = require('passport');



module.exports = class controlerUsers{

	static async create(req, res){
		console.log("***********************");
		console.log("On create");
		console.log(req.body);
		let {pseudo, mail, password} = req.body;
		User.build({pseudo, mail, password}).save();
		res.send(req.body);
	}

	static async getProfile(req, res){
		console.log("***********************");
		console.log("On donne profil");
		console.log(req.user);
		console.log(req.session);
		res.send(req.user);
	}

	static async signIn(req, res){

			console.log("***********************");
			console.log("On sign in");

		//req.session.save(function(){
			console.log("***********************");
			console.log("On sign in");
			//console.log(res.cookies);
			console.log(req.session);
			//res.session = "test";
			res.send(req.user);
		//});

	}

}

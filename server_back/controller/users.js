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
		res.send("le profile");
	}

	static async signIn(req, res){
		console.log("***********************");
		console.log("On sign in");
		console.log(req.body);
		res.send(req.body);
	}

}

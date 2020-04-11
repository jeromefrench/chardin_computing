const express = require('express');
const User = require(SRC + '/model/users.js')



module.exports = class controlerUsers{

	static async create(req, res){
		console.log("***********************");
		console.log("On create");
		console.log(req.body);
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

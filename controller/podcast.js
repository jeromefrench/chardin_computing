const express = require('express');
var router = express.Router();
const fs = require('fs');
const db = require(SRC + '/config/database.js');
const { check, validationResult } = require('express-validator')
const Podcast = require(SRC + '/model/podcast.js')
const multer  = require('multer');


module.exports = class controlerPodcast{

	static async create(req, res){
		console.log("&&&&&&&&&&&&&&");
		console.log(req.body);
		console.log(req.hello);
		console.log(req.files);
		let {title, pathName, date, country, description} =  req.body;
		Podcast.build({title, pathName, date, country,description}).save();
		res.send(req.body);
	}

	static async list(req, res){
		Podcast.findAll()
			.then((podcasts) => {
				res.send(podcasts);
			})
			.catch(err => {
				console.log(err);
			})
	}

}



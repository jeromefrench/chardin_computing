const express = require('express');
var router = express.Router();
const fs = require('fs');
const db = require(SRC + '/config/database.js');
const { check, validationResult } = require('express-validator')
const Podcast = require(SRC + '/model/podcast.js')
const multer  = require('multer');


module.exports = class controlerPodcast{

	static async delete(req, res){
		console.log(req.body);
		console.log(req.body.id);
		let podcast = await Podcast.findOne({where: { 'id': req.body.id }});
		console.log(podcast);
		console.log(podcast.pathName);
		fs.unlinkSync(SRC + "/public/podcast/" + podcast.pathName);
		podcast.destroy();
		res.send(req.body);
	}

	static async create(req, res){
		console.log("&&&&&&&&&&&&&&");
		console.log(req.body);
		console.log(req.hello);
		console.log(req.files);
		let {title, pathName, date, country, description} =  req.body;
		Podcast.build({title, pathName, date, country,description}).save();
		//on transfert
		fs.rename(SRC + '/public/podcast/'+req.fileName, SRC + '/public/podcast/' + pathName, function (err) {
			if (err)
				console.log(err);
		});
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



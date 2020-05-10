require('dotenv').config();
const express = require('express');
var router = express.Router();
const fs = require('fs');
const db = require('@root/config/database.js');
const { check, validationResult } = require('express-validator')
const Podcast = require('@root/model/podcast.js')
const multer  = require('multer');


module.exports = class controlerPodcast{

	static async create(req, res){
		let {title, pathName, date, country, description} =  req.body;
		const podcast = await Podcast.build({title, pathName, date, country,description}).save();
		//on transfert
		fs.rename(  process.env.ASSETS_PATH + '/podcasts/' + req.fileName,
					process.env.ASSETS_PATH + '/podcasts/' + pathName, function (err) {
			if (err)
				console.log(err);
		});
		res.status(201).send(podcast);
	}


	static async delete(req, res){
		console.log(req.body);
		let podcast = await Podcast.findOne({where: { 'id': req.body.id }});
		console.log(podcast);
		fs.unlinkSync(process.env.ASSETS_PATH + "/podcasts/" + podcast.pathName);
		podcast.destroy();
		res.send(req.body);
	}

	static async update(req, res){
		console.log("On update" + req.params.idi);
		console.log(req.body);
		//faire le middle ware
		let {title, pathName, date, country, description} =  req.body;
		let podcast = await Podcast.findOne({where: { 'id': req.params.idi }});
		podcast.title = title;
		podcast.pathName = pathName;
		podcast.country = country;
		podcast.description = description;
		await podcast.save();
		res.send(req.body);
	}


	static async list(req, res){
		Podcast.findAll({order: [['date', 'ASC']]})
			.then((podcasts) => {
				res.send(podcasts);
			})
			.catch(err => {
				console.log(err);
			})
	}

	static async get(req, res){
		console.log(req.params);
		let podcast = await Podcast.findOne({where: { 'id': req.params.idi }});
		res.send(podcast);
	}

}



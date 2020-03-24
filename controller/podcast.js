const express = require('express');
const fs = require('fs');
const db = require(SRC + '/config/database.js');
const { check, validationResult } = require('express-validator')
const Podcast = require(SRC + '/model/podcast.js')

module.exports = class homeController {

	static listPodcast(req, res){
		var podcastFolder = SRC + '/public/podcast';
		console.log(podcastFolder);
		fs.readdir(podcastFolder, (err, files) => {
			res.send(files);
		});
	}

	static getPodcast(req, res){
		res.send('hello');
		Essai.findAll()
		.then((result) => {
			console.log(result);
			console.log("********************");
		})
		.catch(err => {
			console.log(err);
		})
	}

	static validationPostRules(){
		return [
			check('pathName').isString().bail().isLength({min: 3, max: 255}),
			check('date').isISO8601(),
			check('country').isString().bail().isLength({min: 3, max: 255}),
		]
	}

	static validate(req, res, next){
		const errors = validationResult(req)
		if (errors.isEmpty()) {
			return next()
		}
		const extractedErrors = []
		errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
		return res.status(422).json({
			errors: extractedErrors,
		})
	}

	static async postPodcast(req, res){
		let {pathName, date, country} =  req.body;
		let result = await Podcast.findOne({where: {'pathName': pathName}});
		if (!result)
			Podcast.build({pathName, date, country}).save();
		else
			Podcast.update({pathName, date, country}).save();

		res.send(req.body);
	}

}

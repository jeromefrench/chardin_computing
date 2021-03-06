require('dotenv').config();
const express = require('express');
var router = express.Router();
const fs = require('fs');
const db = require('@root/config/database.js');
const { check, validationResult } = require('express-validator')
const Podcast = require('@root/model/podcast.js')
const multer  = require('multer');



module.exports = {

	validate: function(req, res, next){

		const errors = validationResult(req)
		if (errors.isEmpty()) {
			return next()
		}
		const extractedErrors = []
		errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
		return res.status(400).json({
			errors: extractedErrors,
		})
	},
	testa: multer({
		// dest:'public/podcast',
		fileFilter: function (req, file, cb) {

			// The function should call `cb` with a boolean
			// to indicate if the file should be accepted

			// To reject this file pass `false`, like so:
			//cb(null, false)

			// To accept the file pass `true`, like so:
			cb(null, true)

			// You can always pass an error if something goes wrong:
			//cb(new Error('I don\'t have a clue!'))
		},
		limits : {fileSize: 100000000000, files: 1},
		storage: multer.diskStorage({
			destination: function (req, file, cb) {
				cb(null, process.env.ASSETS_PATH + '/podcasts')
			},
			filename: function (req, file, cb) {
				req.fileName = Math.floor(Math.random() * 10000) + '-' + Date.now();
				//on enregistre un nom temporaire que lon save dand req
				cb(null, req.fileName);
			}
		})
	}).any(),
	validationPostRules: function(){
		return [
			check('title').isString().bail().isLength({min: 1, max: 255}),
			check('pathName').isString().bail().isLength({min: 1, max: 255}),
			check('date').isISO8601(),
			check('country').isString().bail().isLength({min: 1, max: 255}),
			//	check('description'),
		]
	},
	auth: function(req, res, next){
		if(req.user && (req.user.mail == "jmail@jmail.jj" || req.user.mail == "arsene.daudier@yahoo.fr")   )
		{
			next();
		}
		else
		{
			res.send("need auth");
		}
	}

}

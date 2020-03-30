const express = require('express');
var router = express.Router();
const fs = require('fs');
const db = require(SRC + '/config/database.js');
const { check, validationResult } = require('express-validator')
const Podcast = require(SRC + '/model/podcast.js')
const multer  = require('multer');


module.exports = class middlewarePodcast{

	static validationPostRules(){
		return [
			check('title').isString().bail().isLength({min: 1, max: 255}),
			check('pathName').isString().bail().isLength({min: 1, max: 255}),
			check('date').isISO8601(),
			check('country').isString().bail().isLength({min: 1, max: 255}),
		//	check('description'),
		]
	}

}



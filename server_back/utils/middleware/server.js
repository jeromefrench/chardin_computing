
require('dotenv').config();
const express = require('express');
var router = express.Router();
const fs = require('fs');
const db = require('@root/config/database.js');
const { check, validationResult } = require('express-validator')
const Podcast = require('@root/model/podcast.js')
const multer  = require('multer');
var bodyParser = require('body-parser');

middleware = {

	cors: function(req, res, next){
		res.header('Access-Control-Allow-Credentials', "true");
		res.header("Access-Control-Allow-Origin", process.env.FRONT_URL);
		res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	},
	bodyParse: bodyParser.json(),
	bodyParseUrl: bodyParser.urlencoded({ extended: true }),

}

module.exports = [
					middleware.cors,
					middleware.bodyParse,
					middleware.bodyParseUrl
				];




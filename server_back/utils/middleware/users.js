require('dotenv').config();
const express = require('express');
var router = express.Router();
const fs = require('fs');
const db = require(SRC + '/config/database.js');
const { check, validationResult } = require('express-validator')
const User = require(SRC + '/model/users.js')

module.exports = {
	validationPostRules: function(){
		return [
			check('pseudo')
				.isString()
				.withMessage('speudo must be a string')
				.bail()
				.isLength({min: 3, max: 255})
				.withMessage('speudo must be at least 3 chars long')
				.bail()
				.custom(async (pseudo) => {
					let result = await User.isPseudoExist(pseudo);
					if (result) {
						throw new Error('pseudo already registered')
					}
				}),
			check('mail')
				.isString()
				.withMessage('mail should be a string')
				.bail()
				.isEmail()
				.withMessage('mail wrong format')
				.bail()
				.custom(async (mail) => {
					let result = await User.isMailExist(mail);
					if (result) {
						throw new Error('mail already registered')
					}
				}),
			check('password')
				.isString()
				.withMessage('passwd should be a string')
				.bail()
				.isLength({min: 6, max: 255})
				.withMessage('passwd must be at least 6 chars long')
		]
	},
	validationSignInRules: function(){
		return [
			check('mail')
				.isString()
				.withMessage('mail should be a string')
				.bail()
				.isEmail()
				.withMessage('mail wrong format') ,
			check('password')
				.isString()
				.withMessage('passwd should be a string')
				.bail()
				.isLength({min: 6, max: 255})
				.withMessage('passwd must be at least 6 chars long')
		]
	},
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
}


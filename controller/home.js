const express = require('express');
const fs = require('fs');
const db = require(SRC + '/config/database.js');
const Essai = require(SRC + '/model/podcast.js')

module.exports = class homeController {

	// static getPodcast(req, res){
	// 	var podcastFolder = SRC + '/public/podcast';
	// 	console.log(podcastFolder);
	// 	fs.readdir(podcastFolder, (err, files) => {
	// 		res.send(files);
	// 	});
	// }

	static getPodcast(req, res){
		res.send('hello');
		Essai.findAll()
		.then((result) => {
			console.log("********************");
			console.log(result);
			console.log("********************");
		})
		.catch(err => {
			console.log(err);
		})
	}

	static postPodcast(req, res){
		var podcastFolder = SRC + '/public/podcast';
		console.log(podcastFolder);
		fs.readdir(podcastFolder, (err, files) => {
			res.send(files);
		});
	}


}

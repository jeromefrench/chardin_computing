const express = require('express');
const fs = require('fs');

module.exports = class homeController {

	static getPodcast(req, res){
		var podcastFolder = SRC + '/public/podcast';
		console.log(podcastFolder);
		fs.readdir(podcastFolder, (err, files) => {
			res.send(files);
		});
	}

}

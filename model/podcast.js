const Sequelize = require('sequelize');
const db = require(SRC + '/config/database.js');


const Podcast = db.define('podcast', {
	title: {
		type: Sequelize.STRING
	},
	pathName: {
		type: Sequelize.STRING
	},
	date: {
		type: Sequelize.DATE
	},
	country: {
		type: Sequelize.STRING
	},
	description: {
		type: Sequelize.STRING
	}
});

module.exports = Podcast;

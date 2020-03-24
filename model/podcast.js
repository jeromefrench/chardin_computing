const Sequelize = require('sequelize');
const db = require(SRC + '/config/database.js');


const Podcast = db.define('podcast', {
	pathName: {
		type: Sequelize.STRING
	},
	date: {
		type: Sequelize.DATE
	},
	country: {
		type: Sequelize.STRING
	}
});

module.exports = Podcast;

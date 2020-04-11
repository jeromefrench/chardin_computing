const Sequelize = require('sequelize');
const db = require(SRC + '/config/database.js');


const User = db.define('user', {
	pseudo: {
		type: Sequelize.STRING
	},
	mail: {
		type: Sequelize.STRING
	},
	passord: {
		type: Sequelize.STRING
	},
});

module.exports = User;

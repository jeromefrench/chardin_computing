const Sequelize = require('sequelize');
const db = require(SRC + '/config/database.js');


const Essai = db.define('essai', {
	title: {
		type: Sequelize.STRING
	},
	technologies: {
		type: Sequelize.STRING
	},
	description: {
		type: Sequelize.STRING
	},
	budget: {
		type: Sequelize.STRING
	},
	contact_email: {
		type: Sequelize.STRING
	}
});

module.exports = Essai;

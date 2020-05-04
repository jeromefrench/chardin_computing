const Sequelize = require('sequelize');
let app = require(SRC + '/server.js');
require('dotenv').config();


db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWD, {
	host: process.env.DB_HOST,
	dialect: 'postgres',
	logging: false,  //verbose
});


db.authenticate()
	.then(() => {
//		console.log('Connection has been established successfully.');
	})
	.catch(err => {
		console.error('Unable to connect to the database:', err);
	});

module.exports = db;


// const Sequelize = require('sequelize');
const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require(SRC + '/config/database.js');
// const sequelize = new Sequelize('sqlite::memory');


class User extends Model {
	static classLevelMethod() {
		return 'foo';
	}
	static async isPseudoExist(pseudo) {
		const exist = await User.findOne({where: { 'pseudo': pseudo }});
		if(exist == null)
			return(false);
		else
			return(true);
	}
	instanceLevelMethod() {
		return 'bar';
	}
	getFullname() {
		return [this.pseudo, this.mail].join(' ');
	}
}

User.init({
	pseudo: {
		type: Sequelize.STRING
	},
	mail: {
		type: Sequelize.STRING
	},
	password: {
		type: Sequelize.STRING
	},
}, {
	// Other model options go here
	sequelize: db, // We need to pass the connection instance
	modelName: 'User' // We need to choose the model name
});




// const User = db.define('user', {
// 	pseudo: {
// 		type: Sequelize.STRING
// 	},
// 	mail: {
// 		type: Sequelize.STRING
// 	},
// 	password: {
// 		type: Sequelize.STRING
// 	},
// });

module.exports = User;

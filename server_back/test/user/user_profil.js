require('module-alias/register')
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('@root/server.js');
let should = chai.should();
const { expect } = require('chai')
const db = require('@root/config/database.js');
const User = require('@root/model/users.js')
chai.use(chaiHttp);

//tester le cookie

describe('User profil test', () => {

	let agent;
	const new_user = {
			"pseudo": "jspeudo",
			"mail": "jmail@jmail.jj",
			"password": "jpasswd"
	}

	before(async () => {
		await db.drop(); //empty the db
		await db.sync({alter: true}); //to create the db shema
	})

	beforeEach(async () => {
		User.destroy({
			where: {},
			truncate: true
		})
	})

	context('with good argument', function() {
		let errorMessage = "pseudo already registered";
		it('Should return 200 and the user ' + JSON.stringify(new_user) , async () => {
			try {
				agent = chai.request.agent(app);
				await agent.post('/user').send(new_user);
				await agent.post('/user/sign-in').send(new_user);
				res = await agent.get('/user');
				console.log(res.body);
				// await expect(res).to.have.status(400);
				// expect(res.body.errors[0].pseudo).to.be.equal(errorMessage);
			} catch (err) {
				console.log(err.message);
			}
		});
	});

	// describe('Return profile GET /user', () => {
	// 	it('Should return 200 and the user', (done) => {
	// 		agent
	// 			.get('/user')
	// 			.end((err, res) => {
	// 				expect(res).to.have.status(200);
	// 				expect(res.body).to.have.property('id');
	// 				expect(res.body).to.have.property('pseudo');
	// 				expect(res.body).to.have.property('mail');
	// 				expect(res.body).to.have.property('password');
	// 				expect(res.body.pseudo).to.be.equal("jspeudo");
	// 				expect(res.body.mail).to.be.equal("jmail@jmail.jj");
	// 				expect(res.body.password).to.be.equal("jpasswd");
	// 				done();
	// 			});
	// 	});
	// })


});

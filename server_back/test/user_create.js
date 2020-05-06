let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../server.js');
let should = chai.should();
const { expect } = require('chai')
const db = require('../config/database.js');
const User = require(SRC + '/model/users.js')

//tester le cookie

chai.use(chaiHttp);


describe('Create POST /user', () => {


	let authenticatedUser;
	let new_user = {
			"pseudo": "jspeudo",
			"mail": "jmail",
			"password": "jpasswd"
		}

	before(async () => {
		authenticatedUser = chai.request.agent(app);
		await db.drop(); //empty the db
		await db.sync({alter: true}); //to create the db shema
	})

	beforeEach(async () => {
		User.destroy({
			where: {},
			truncate: true
		})
	})

	context('with good arguments', function() {
		it('Should return 201 and the user', (done) => {
			authenticatedUser
				.post('/user')
				.send(new_user)
				.end((err, res) => {
					expect(res).to.have.status(201);
					expect(res.body).to.have.property('id');
					expect(res.body).to.have.property('pseudo');
					expect(res.body).to.have.property('mail');
					expect(res.body).to.have.property('password');

					expect(res.body.pseudo).to.be.equal("jspeudo");
					expect(res.body.mail).to.be.equal("jmail");
					expect(res.body.password).to.be.equal("jpasswd");
					done();
				});
		});
	});

	context('with speudo not a string', function() {
		it('Should return 400 and the error message', (done) => {
			let other_user = {...new_user};
			other_user.pseudo = {test: 'test'};
			authenticatedUser
				.post('/user')
				.send(other_user)
				.end((err, res) => {
					expect(res).to.have.status(400);
					expect(res.body.errors[0].pseudo).to.be.equal("must be a string ya");
					done();
				});
		});
	});

	// context('with speudo too short < 3', function() {
	// 	it('Should return 400 and the error message', (done) => {
	// 		let other_user = new_user;
	// 		console.log(new_user);
	// 		other_user.pseudo = "js";
	// 		console.log(new_user);
	// 		authenticatedUser
	// 			.post('/user')
	// 			.send(other_user)
	// 			.then((res) => {
	// 				expect(res).to.have.status(400);
	// 				expect(res.body.errors[0].pseudo).to.be.equal("must be at least 3 chars long");
	// 				done();
	// 			}).catch(err => {
	// 				console.log(err.message);
	// 			})
	// 	});
	// });

	// context('with speudo that already exist', function() {
	// 	it('Should return 400 and the error message', async () => {
	// 		try {
	// 			console.log(new_user);
	// 			await authenticatedUser.post('/user').send(new_user);
	// 			res = await authenticatedUser.post('/user').send(new_user);
	// 			console.log(res.body);
	// 			await expect(res.body.errors[0].pseudo).to.be.equal("must be at least 3 chars long");
	// 			await expect(res).to.have.status(400);
	// 		} catch (err) {
	// 			console.log(err.message);
	// 		}
	// 	});
	// });

})

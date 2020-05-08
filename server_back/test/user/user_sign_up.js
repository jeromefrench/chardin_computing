require('module-alias/register');
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('@root/server.js');
let should = chai.should();
const { expect } = require('chai')
const db = require('@root/config/database.js');
const User = require('@root/model/users.js')
chai.use(chaiHttp);


describe('User create POST /user', () => {

	let agent;
	let new_user = {
			"pseudo": "jspeudo",
			"mail": "jmail@jmail.jj",
			"password": "jpasswd"
		}

	before(async () => {
		agent = chai.request.agent(app);
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
		it('Should return 201 and the user' + JSON.stringify(new_user) , (done) => {
			agent
				.post('/user')
				.send(new_user)
				.end((err, res) => {
					expect(res).to.have.status(201);
					expect(res.body).to.have.property('id');
					expect(res.body).to.have.property('pseudo');
					expect(res.body).to.have.property('mail');
					expect(res.body).to.have.property('password');

					expect(res.body.pseudo).to.be.equal("jspeudo");
					expect(res.body.mail).to.be.equal("jmail@jmail.jj");
					expect(res.body.password).to.be.equal("jpasswd");
					done();
				});
		});
	});

	context('with speudo not a string', function() {
		let errorMessage = "speudo must be a string"
		it(`Should return 400 and the error "${errorMessage}"`, (done) => {
			let other_user = {...new_user};
			other_user.pseudo = {test: 'test'};
			agent
				.post('/user')
				.send(other_user)
				.end((err, res) => {
					expect(res).to.have.status(400);
					expect(res.body.errors[0].pseudo).to.be.equal(errorMessage);
					done();
				});
		});
	});

	context('with speudo too short < 3', function() {
		let errorMessage = "speudo must be at least 3 chars long"
		it(`Should return 400 and the error "${errorMessage}"`, (done) => {
			let other_user = {...new_user};
			other_user.pseudo = "js";
			agent
				.post('/user')
				.send(other_user)
				.end((err, res) => {
					expect(res).to.have.status(400);
					expect(res.body.errors[0].pseudo).to.be.equal(errorMessage);
					done();
				});
		});
	});

	context('with speudo that already exist', function() {
		let errorMessage = "pseudo already registered";
		it(`Should return 400 and the error "${errorMessage}"`, async () => {
			try {
				await agent.post('/user').send(new_user);
				res = await agent.post('/user').send(new_user);
				await expect(res).to.have.status(400);
				expect(res.body.errors[0].pseudo).to.be.equal(errorMessage);
			} catch (err) {
				console.log(err.message);
			}
		});
	});

	context('with mail not a string', function() {
		let errorMessage = "mail should be a string";
		it(`Should return 400 and the error "${errorMessage}"`, (done) => {
			let other_user = {...new_user};
			other_user.mail = {hey: "you"};
			agent
				.post('/user')
				.send(other_user)
				.end((err, res) => {
					expect(res).to.have.status(400);
					expect(res.body.errors[0].mail).to.be.equal(errorMessage);
					done();
				});
		});
	});

	context('with mail wrong format', function() {
		let errorMessage = "mail wrong format";
		it(`Should return 400 and the error "${errorMessage}"`, (done) => {
			let other_user = {...new_user};
			other_user.mail = "wrong@mail";
			agent
				.post('/user')
				.send(other_user)
				.end((err, res) => {
					expect(res).to.have.status(400);
					expect(res.body.errors[0].mail).to.be.equal(errorMessage);
					done();
				});
		});
	});

	context('with mail already exist', function() {
		let errorMessage = "mail already registered";
		it(`Should return 400 and the error "${errorMessage}"`, async () => {
			try {
				await agent.post('/user').send(new_user);
				let other_user = {...new_user};
				other_user.pseudo = "new_speudo";
				res = await agent.post('/user').send(other_user);
				expect(res).to.have.status(400);
				expect(res.body.errors[0].mail).to.be.equal(errorMessage);
			} catch (err) {
				console.log(err.message);
			}
		});
	});

	context('with passwd not a string', function() {
		let errorMessage = "passwd should be a string";
		it(`Should return 400 and the error "${errorMessage}"`, (done) => {
			let other_user = {...new_user};
			agent
				.post('/user')
				.send(other_user)
				.end((err, res) => {
					// expect(res).to.have.status(400);
					// expect(res.body.errors[0].passwd).to.be.equal(errorMessage);
					done();
				});
		});
	});

	context('with password too short < 6', function() {
		let errorMessage = "password must be at least 6 chars long"
		it(`Should return 400 and the error "${errorMessage}"`, (done) => {
			let other_user = {...new_user};
			agent
				.post('/user')
				.send(other_user)
				.end((err, res) => {
					// expect(res).to.have.status(400);
					// expect(res.body.errors[0].passwd).to.be.equal(errorMessage);
					done();
				});
		});
	});
})

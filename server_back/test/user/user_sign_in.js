require('module-alias/register')
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('@root/server.js');
let should = chai.should();
const { expect } = require('chai')
const db = require('@root/config/database.js');
const User = require('@root/model/users.js')
chai.use(chaiHttp);


describe('User sign-in POST /user/sign-in', () => {

	let agent;
	let new_user = {
		"pseudo": "jspeudo",
		"mail": "jmail@jmail.jj",
		"password": "jpasswd"
	}

	before(async () => {
		await db.drop(); //empty the db
		await db.sync({alter: true}); //to create the db shema
	})

	beforeEach(async () => {
		agent = chai.request.agent(app);
		await User.destroy({ where: {}, truncate: true });
		await agent.post('/user').send(new_user);
	})

	context('with good arguments', function() {
		it('Should return 200 and the user' + JSON.stringify(new_user) , (done) => {

		new_agent = chai.request.agent(app);
			new_agent
				.post('/user/sign-in')
				.send(new_user)
				.end((err, res) => {
					expect(res).to.have.status(200);
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

	context('with mail not a string', function() {
		let errorMessage = "mail should be a string";
		it(`Should return 400 and the error "${errorMessage}"`, (done) => {
			let other_user = {...new_user};
			other_user.mail = {hello: "you"};
			agent
				.post('/user/sign-in')
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
			other_user.mail = "ok.boomer";
			agent
				.post('/user/sign-in')
				.send(other_user)
				.end((err, res) => {
					expect(res).to.have.status(400);
					expect(res.body.errors[0].mail).to.be.equal(errorMessage);
					done();
				});
		});
	});

	context('with password not a string', function() {
		let errorMessage = "passwd should be a string";
		it(`Should return 400 and the error "${errorMessage}"`, (done) => {
			let other_user = {...new_user};
			other_user.password = {hello: "you"};
			agent
				.post('/user/sign-in')
				.send(other_user)
				.end((err, res) => {
					expect(res).to.have.status(400);
					expect(res.body.errors[0].password).to.be.equal(errorMessage);
					done();
				});
		});
	});

	context('with password too short', function() {
		let errorMessage = "passwd must be at least 6 chars long";
		it(`Should return 400 and the error "${errorMessage}"`, (done) => {
			let other_user = {...new_user};
			other_user.password = "short";
			agent
				.post('/user/sign-in')
				.send(other_user)
				.end((err, res) => {
					expect(res).to.have.status(400);
					expect(res.body.errors[0].password).to.be.equal(errorMessage);
					done();
				});
		});
	});

	context('with wrong mail', function() {
		let errorMessage = "wrong mail";
		it(`Should return 400 and the error "${errorMessage}"`, (done) => {
			let other_user = {...new_user};
			other_user.mail = "random@mail.walou";
			agent
				.post('/user/sign-in')
				.send(other_user)
				.end((err, res) => {
					expect(res).to.have.status(400);
					expect(res.body.error).to.be.equal(errorMessage);
					done();
				});
		});
	});

	context('with wrong password', function() {
		let errorMessage = "wrong password";
		it(`Should return 400 and the error "${errorMessage}"`, (done) => {
			let other_user = {...new_user};
			other_user.password = "randompassword";
			agent
				.post('/user/sign-in')
				.send(other_user)
				.end((err, res) => {
					expect(res).to.have.status(400);
					expect(res.body.error).to.be.equal(errorMessage);
					done();
				});
		});
	});

});


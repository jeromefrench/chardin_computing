require('module-alias/register')
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('@root/server.js');
let should = chai.should();
const { expect } = require('chai')
const db = require('@root/config/database.js');
chai.use(chaiHttp);

//tester le cookie


describe('User basic test', () => {

	let agent;
	const new_user = {
			"pseudo": "jspeudo",
			"mail": "jmail@jmail.jj",
			"password": "jpasswd"
	}

	before(async () => {
		agent = chai.request.agent(app);
		await db.drop(); //empty the db
		await db.sync({alter: true}); //to create the db shema
	})

	describe('Create POST /user', () => {
		it('Should return 201 and the user', (done) => {
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
	})

	describe('Sign in POST /user/sign-in', () => {
		it('Should return 200 and the user', (done) => {
			agent
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
	})

	describe('Return profile GET /user', () => {
		it('Should return 200 and the user', (done) => {
			agent
				.get('/user')
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
	})

	describe('Sign out GET /user/sign-out', () => {
		it('Should return 200 and sign out', (done) => {
			agent
				.get('/user/sign-out')
				.end((err, res) => {
					expect(res).to.have.status(200);
					done();
				});
		});
	})

});

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../server.js');
let should = chai.should();
const { expect } = require('chai')
const db = require('../config/database.js');

//tester le cookie

chai.use(chaiHttp);

const new_user = {
	"pseudo": "jspeudo",
	"mail": "jmail",
	"password": "jpasswd"
}

	let authenticatedUser;

describe('User test', () => {


	before(async () => {
		authenticatedUser = chai.request.agent(app);
		await db.drop(); //empty the db
		await db.sync({alter: true}); //to create the db shema
	})



	describe('Create POST /user', () => {
		it('Should return 201 and the user', (done) => {
			authenticatedUser
				.post('/user')
				.send(new_user)
				.then((res) => {
					expect(res).to.have.status(201);
					expect(res.body).to.have.property('id');
					expect(res.body).to.have.property('pseudo');
					expect(res.body).to.have.property('mail');
					expect(res.body).to.have.property('password');
					expect(res.body.pseudo).to.be.equal("jspeudo");
					expect(res.body.mail).to.be.equal("jmail");
					expect(res.body.password).to.be.equal("jpasswd");
					done();
				}).catch(err => {
					console.log(err.message);
				})
		});
	})

	describe('Sign in POST /user/sign-in', () => {
		it('Should return 200 and the user', (done) => {
			authenticatedUser
				.post('/user/sign-in')
				.send(new_user)
				.then((res) => {
					expect(res).to.have.status(200);
					expect(res.body).to.have.property('id');
					expect(res.body).to.have.property('pseudo');
					expect(res.body).to.have.property('mail');
					expect(res.body).to.have.property('password');
					expect(res.body.pseudo).to.be.equal("jspeudo");
					expect(res.body.mail).to.be.equal("jmail");
					expect(res.body.password).to.be.equal("jpasswd");
					done();
				}).catch(err => {
					console.log(err.message);
				})
		});
	})


	describe('Return profile GET /user', () => {
		it('Should return 200 and the user', (done) => {
			authenticatedUser
				.get('/user')
				.then((res) => {
					expect(res).to.have.status(200);
					expect(res.body).to.have.property('id');
					expect(res.body).to.have.property('pseudo');
					expect(res.body).to.have.property('mail');
					expect(res.body).to.have.property('password');
					expect(res.body.pseudo).to.be.equal("jspeudo");
					expect(res.body.mail).to.be.equal("jmail");
					expect(res.body.password).to.be.equal("jpasswd");
					done();
				}).catch(err => {
					console.log(err.message);
				})
		});
	})


});


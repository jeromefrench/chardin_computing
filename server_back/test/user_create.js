let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../server.js');
let should = chai.should();
const { expect } = require('chai')
const db = require('../config/database.js');
const User = require(SRC + '/model/users.js')

//tester le cookie

chai.use(chaiHttp);

const new_user = {
	"pseudo": "jspeudo",
	"mail": "jmail",
	"password": "jpasswd"
}

describe('Create POST /user', () => {

	let authenticatedUser;

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
				.then((res) => {
					console.log(res.body);
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
	});

	context('with speudo that already exist', function() {
		it('Should return 400 and the error message', async () => {
			try {
				await authenticatedUser.post('/user').send(new_user);
				res = await authenticatedUser.post('/user').send(new_user);
				console.log(res.body);
				expect(res).to.have.status(400);
			} catch (err) {
					console.log(err.message);
			}
		});

	});

	context('with speudo too short', function() {
		it('Should return 400 and the error message', (done) => {
			new_user.pseudo = "js";
			authenticatedUser
				.post('/user')
				.send(new_user)
				.then((res) => {
					console.log(res.body);
					expect(res).to.have.status(400);
					done();
				}).catch(err => {
					console.log(err.message);
				})
		});
	});

})

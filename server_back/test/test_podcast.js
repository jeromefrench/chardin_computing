let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../server.js');
let should = chai.should();
const { expect } = require('chai')
const db = require('../config/database.js');


chai.use(chaiHttp);

 before(async () => {
	await db.drop(); //empty the db
	await db.sync({alter: true}); //to create the db shema
 })

const new_user = {
	"pseudo": "jspeudo",
	"mail": "jmail",
	"password": "jpasswd"
}

describe('Create a user POST /user', () => {
	it('Should return 201 and the user', (done) => {
		chai.request(app).post('/user')
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



describe('User sign in', () => {
	it('Should return 200 and the user', (done) => {
		chai.request(app).post('/user/sign-in')
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

//describe('/POST podcast', () => {
//	it('it should create a podcast and return it', (done) => {
//		chai.request(server)
//			.post('/podcast')
//			.set('Content-Type', 'application/x-www-form-urlencoded')
//			.field('title', 'title_test')
//			.field('pathname', 'pathname_test')
//			.field('date', 'date_test')
//			.field('country', 'country_test')
//			.field('description', 'description_test')
//			.end((err, res) => {
//				console.log(res.body);
//				res.should.have.status(200);
//				res.body.should.be.a('array');
//				//res.body.length.should.be.eql(0);
//				done();
//			});
//	});
//});

//describe('/GET podcast', () => {
//	it('it should GET all the podcasts', (done) => {
//		chai.request(server)
//			.get('/podcast')
//			.end((err, res) => {
//				console.log(res.body);
//				res.should.have.status(200);
//				res.body.should.be.a('array');
//				//res.body.length.should.be.eql(0);
//				done();
//			});
//	});
//});

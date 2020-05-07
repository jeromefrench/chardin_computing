let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../server.js');
let should = chai.should();
const fs = require('fs');
const { expect } = require('chai')
const db = require('../config/database.js');

chai.use(chaiHttp);


describe('Podcast test', () => {


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
		let res;
		res = await agent.post('/user').send(new_user);
		res = await agent.post('/user/sign-in').send(new_user);
	})
	// console.log(SRC + '/test/seed/Day 10.mp3');

	//rajouter le fichier podcast
	describe('Create POST /podcast', () => {
		it('it should return 201 and the podcast', (done) => {
			agent
				.post('/podcast')
				.set('Content-Type', 'application/x-www-form-urlencoded')
				.field('title', 'title_test')
				.field('pathName', 'pathname_test')
				.field('date', '2020-05-05')
				.field('country', 'country_test')
				.field('description', 'description_test')
				.attach('avatar', fs.readFileSync(SRC + '/test/seed/Day 10.mp3'), 'Day 10.mp3')
				.end((err, res) => {
					res.should.have.status(201);
					done();
				});
		});
	});

});


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

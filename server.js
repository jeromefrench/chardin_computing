SRC = __dirname;
require('dotenv').config();
console.log(SRC);

const express = require('express');
const app = express();
const controller = require(SRC +'/controller/index.js');
var bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator')


// parse application/json
app.use(bodyParser.json());
const db = require(SRC + '/config/database.js');

//force a creer la table
db.sync({alter: true});


app.use('/static', express.static(SRC + '/public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://chardin-computing.freeboxos.fr"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/test', (req, res) => { res.send('test back'); });
app.get('/podcast', controller.podcast.getPodcast);
app.post('/podcast',
	controller.podcast.validationPostRules(),
	controller.podcast.validate,
	controller.podcast.postPodcast);


const PORT = process.env.PORT || 3000;
console.log(`Server back listening on port ${PORT}`);
app.listen(PORT);

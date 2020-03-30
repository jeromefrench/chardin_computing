SRC = __dirname;
require('dotenv').config();
console.log(SRC);

const express = require('express');
const app = express();
const router = require(SRC +'/controller/index.js');


var bodyParser = require('body-parser');
const multer  = require('multer');

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

app.use('/podcast', router.podcast);



// app.get('/podcast', controller.podcast.getPodcast);
// app.post('/podcast',
// 	controller.podcast.testtest(),
// 	controller.podcast.validationPostRules(),
// 	controller.podcast.validate,
// 	controller.podcast.postPodcast);


app.use(function (err, req, res, next) {
  if (err instanceof multer.MulterError) res.status(501).send(err.message);
  else next(err);
});


const PORT = process.env.PORT || 3000;
console.log(`Server back listening on port ${PORT}`);
app.listen(PORT);

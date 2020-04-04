SRC = __dirname;
require('dotenv').config();
const express = require('express');
const multer  = require('multer');
const app = express();
const router = require(SRC +'/router/index.js');
const midleware = require(SRC +'/utils/middleware/index.js');

/*DATA BASE*/
const db = require(SRC + '/config/database.js');
db.sync({alter: true});

/*MIDDLEWARE*/
app.use('/static', express.static(SRC + '/public'));
app.use(midleware.server);

/*ROUTE*/
app.get('/test', (req, res) => { res.send('test back'); });
app.use('/podcast', router.podcast);

/*ERROR*/
app.use(function (err, req, res, next) {
  	if (err instanceof multer.MulterError) res.status(501).send(err.message);
  	else next(err);
});

const PORT = process.env.PORT || 3000;
console.log(`Server back listening on port ${PORT}`);
app.listen(PORT);

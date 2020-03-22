SRC = __dirname;
require('dotenv').config();
console.log(SRC);

const express = require('express');
const app = express();
const controller = require(SRC+'/controller/index.js');

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWD, {
  host: process.env.DB_HOST,
  dialect: 'postgres'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });




app.use('/static', express.static(SRC + '/public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://chardin-computing.freeboxos.fr"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



app.get('/test', (req, res) => { res.send('test back'); });
app.get('/podcast', controller.home.getPodcast);


const PORT = process.env.PORT || 3000;
console.log(`Server back listening on port ${PORT}`);
app.listen(PORT);

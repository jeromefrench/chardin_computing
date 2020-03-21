SRC = __dirname;
console.log(SRC);

const express = require('express');
const app = express();
const controller = require(SRC+'/controller/index.js');

app.use('/static', express.static(SRC + '/public'));

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://chardin-computing.freeboxos.fr"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });



app.get('/test', function (req, res) { res.send('test back'); });
app.get('/podcast', controller.home.getPodcast);


console.log("Server listening on port 3000");
app.listen(3000);

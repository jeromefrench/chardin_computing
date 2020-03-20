const SRC = __dirname;
console.log(SRC);


const express = require('express');
const app = express();
const controller = require(SRC+'/controller/index.js');




app.get('/', controller.home);

app.get('/test', function (req, res) { res.send('test back'); });

console.log("Server listening on port 3000");
app.listen(3000);

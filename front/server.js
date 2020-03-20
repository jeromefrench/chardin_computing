const express = require('express');
const app = express();


app.get('/', function (req, res) { res.send('test front'); });


console.log("Server listening on port 8080");
app.listen(8080);


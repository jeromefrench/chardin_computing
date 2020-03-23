const views = __dirname + '/views/';
console.log(views);
const express = require('express');
const app = express();


app.use(express.static(__dirname + '/public'));



app.get('/test', function (req, res) { res.send('test front'); });
app.get('/', function (req, res) { res.sendFile(views + 'home.html'); });
app.get('/adminPodcast', function (req, res) { res.sendFile(views + 'adminPodcast.html'); });


console.log("Server listening on port 8080");
app.listen(8080);


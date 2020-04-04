const views = __dirname + '/views/';
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname);

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/elements'));

app.get('/test', function (req, res) {
	res.send('test front');
});

app.get('/admin-podcast', function (req, res) {
	res.render('index.ejs', { view: 'adminPodcast'})}
);

app.get('/update-podcast/:id', function (req, res) {
	res.render('index.ejs', { view: 'updatePodcast', id: req.params.id})
});

app.get('/', function (req, res) {
	res.render('index.ejs', { view: 'podcast'})
});

console.log("Server listening on port 8080");
app.listen(8080);


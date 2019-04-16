const axios = require('axios');
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const fs = require('fs');

const port = process.env.PORT || 8080;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

var urlencodedParser = bodyParser.urlencoded({extended: false});

hbs.registerHelper('links', (link) => {
    return link
});

hbs.registerHelper('message', (text) => {
    return text;
});

app.use((request, response, next) => {
    setTimeout(() => {
        next();
    }, 1000);

});

app.get('/', (request, response) => {
	response.render('home.hbs', {
		title: 'Home'
	});
});

app.get('/feature1', (request, response) => {
	response.render('feature1.hbs', {
		title: 'Feature 1'
	});
});

app.post('/feature1', urlencodedParser, (request, response) => {

});

app.get('/feature2', (request, response) => {
	response.render('feature2.hbs', {
		title: 'Feature 2'
	});
});

app.post('/feature2', urlencodedParser, (request, response) => {

});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
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

// FEATURE 1 NOT IMPLEMENTED YET
app.post('/feature1', urlencodedParser, (request, response) => {
	getTemperature(request.body.city).then((message) => {
		response.render('feature1.hbs', {
			title: 'Feature 1',
			output: message
		});
	}).catch((error) => {
		response.render('feature1.hbs', {
			title: 'Feature 1',
			output: 'Invalid City'
		});
	});
});

app.get('/feature2', (request, response) => {
	response.render('feature2.hbs', {
		title: 'Feature 2'
	});
});

// FEATURE 2 NOT IMPLEMENTED YET
app.post('/feature2', urlencodedParser, (request, response) => {

});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});

const getTemperature = async (city) => {
	const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=7a2a58dca43fc0d58ba404dc3e646a7d`);
	const temperature = response.data.main.temp - 273.15;
	const weather = response.data.weather[0].description;
	return `The current temperature in ${city} is ${temperature.toFixed(1)} degrees Celsius with ${weather}`;
}
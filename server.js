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

hbs.registerHelper('getPicture', (img) => {
  return img
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

//FEATURE 1 NOT IMPLEMENTED YET
app.post('/feature1', urlencodedParser, (request, response) => {
	getImages(request.body.input).then((message) => {
		response.render('feature1.hbs', {
			title: 'NASA Images',
			image: message
		});
	}).catch((error) => {
		response.render('feature1.hbs', {
			title: 'NASA Images',
			output: 'Image could not be found'
		});
	});
});

app.get('/feature2', (request, response) => {
	response.render('feature2.hbs', {
		title: 'Feature 2'
	});
});

//FEATURE 2 NOT IMPLEMENTED YET
app.post('/feature2', urlencodedParser, (request, response) => {
	getCards(request.body.input).then((message) => {
		response.render('feature2.hbs', {
			title: 'Cards',
			image: message
		});
	});
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});

const getImages = async (imgSearch) => {
	const response = await axios.get(`https://images-api.nasa.gov/search?q=${encodeURIComponent(imgSearch)}`);
	const image = response.data.collection.items[0].links[0].href;
	return image;
}

const getCards = async (number) => {
	const response = await axios.get(`https://deckofcardsapi.com/api/deck/new/draw/?count=${encodeURIComponent(number)}`);
	const cardImg = response.data.cards[0].image;
	return cardImg;
}
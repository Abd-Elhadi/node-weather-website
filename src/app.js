const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');


const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const pathDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// Setup handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(pathDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Abdelhadi Omar'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'New About',
        name: 'The Robot'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'How can we help you?',
        title: 'Help',
        name: 'Abdelhadi'
    })
});


app.get('/weather', (req, res) => {
    let address = req.query.address;
    if (!address) return res.send({error: 'Address must be provided!'});

    geocode(address, (error, {latitude, longitude, placeName} = {}) => {
        if (error){
            return res.send({error});
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({error});
            }
            res.send({
                forecastData: forecastData,
                placeName,
                address: req.query.address
            });
          });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) return res.send({error: 'Provide a search term!'});
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404-page', {
        title: 'Specific 404',
        msg: 'Help articel not found.',
        name: 'Abdelhadi Omar'
    })
})

app.get('*', (req, res) => {
    res.render('404-page', {
        title: '404',
        msg: 'Page not found',
        name: 'Abdelhadi Omar'
    })
})


app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});


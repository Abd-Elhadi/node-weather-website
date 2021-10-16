const request = require('request');


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0fa4922e5a3b9f90eae51945ed954835&query=' + latitude + ',' + longitude;
    request({url, json: true}, (error, { body }) => {
        if (error){
            callback('Unable to connect to weather service', undefined);
        } else if (body.error){
            callback('Unable to find location!', undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '.' + ' It\'s currently ' + body.current.temperature +  ' degrees out. It feels like '  + body.current.feelslike + ' degrees out, ' + "the humidity is " + body.current.humidity + ".");
        }
    })
};


module.exports = forecast;
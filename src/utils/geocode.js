const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWJkZWxoYWRpLW9tIiwiYSI6ImNrdTl4MmRrZDA4ejkyb252bnRjcGh0YTkifQ.2LMOBOJbkUGv2Ku6lA1C9g';
    request({url, json: true}, (error, { body }) => {
        if (error){
            callback('Unable to connect to location sevices!', undefined);
        } else if (body.features.length === 0){
            callback('Unable to find location. Try another search!', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                placeName: body.features[0].place_name
            });
        }
    })
};


module.exports = geocode;
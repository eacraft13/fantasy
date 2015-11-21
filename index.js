// For simpler require statements
global.__base = __dirname + '/';

var _              = require('lodash');
var async          = require('async');
var request        = require('request');
var secrets        = require('./secrets');
var PlayerGameStat = require('./lib/models/PlayerGameStat');


var season = '2015REG'; // options: 2015
var urls = _.map([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ], function(week) {
    return 'https://api.fantasydata.net/nfl/v2/JSON/PlayerGameStatsByWeek/' + season + '/' + week;
});



async.parallel(_.map(urls, function(url) {
    return function(callback) {
        request({
            url: _.first(urls),
            headers: {
                'Ocp-Apim-Subscription-Key': secrets.ocpApim.subscriptionKey
            }
        }, function(err, response) {
            if (err) throw err;
            if (response.statusCode !== 200) throw response.statusMessage;

            PlayerGameStat.create(JSON.parse(response.body), function(err, data) {
                if (err) throw err;
                callback(err, data);
                console.log(url, 'processed...');
            });
        });
    };
}), function(err, results) {
    if (err) throw err;
    console.log('Success!');
    process.exit();
});


var _           = require('lodash');
var async       = require('async');
var http        = require('http');
var ocpHeaders  = { 'Ocp-Apim-Subscription-Key': 'f05dcf2fe1934b4197174577dfe3068b' };
var rOptions    = { host: '45.56.91.5', port: '28015' };
var r           = require('rethinkdb');
var request     = require('request');



var stats = [
    require('./lib/final_box_scores'),
    // require('./lib/game_stats'),
    require('./lib/players'),
    require('./lib/season_league_leaders')
];



r.connect(rOptions, function(err, conn) {
    if (err) throw err;

    _.each(stats, function(stat) {

        var urls = _.flattenDeep(stat.urls);
        _.each(urls, function(url) {

            request
            //.get({ url: url, headers: ocpHeaders })
            //.get({ url: 'https://www.google.com', headers: headers })
            .get('http://www.google.com')
            .on('error', function(err) {
                console.log('error: ' + err);
            })
            .on('response', function(response) {
                console.log('response: ' + response);

            //    //r
            //    //.db(stat.db)
            //    //.table(stat.table)
            //    //.insert(JSON.parse(response.body))
            //    //.run(conn, function(err, result) {
            //    //    if (err) throw err;
            //    //    console.log(JSON.stringify(result, null, 2));
            //    //});
            });

        });

    });

    console.log('Complete!');
    process.exit();
});

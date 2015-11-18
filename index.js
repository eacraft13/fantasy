var _           = require('lodash');
var async       = require('async');
var ocpHeaders  = { 'Ocp-Apim-Subscription-Key': 'f05dcf2fe1934b4197174577dfe3068b' };
var rOptions    = { host: '45.56.91.5', port: '28015' };
var r           = require('rethinkdb');
var request     = require('request');



var stats = [
    //require('./lib/final_box_scores'),
    //require('./lib/game_stats'),
    //require('./lib/players'),
    //require('./lib/season_league_leaders')
	require('./lib/player_game_stats_by_week')
];



r.connect(rOptions, function(err, conn) {
    if (err) throw err;

    var requests = [];

    _.each(stats, function(stat) {

        var urls = _.flattenDeep(stat.urls);
        _.each(urls, function(url) {
            requests.push(function(callback) {
                request({ url: url, headers: ocpHeaders }, function(err, response) {
                    if (err) throw err;

                    r
                    .db(stat.db)
                    .table(stat.table)
                    .insert(JSON.parse(response.body))
                    .run(conn, function(err, result) {
                        if (err) throw err;
                        console.log('Inserted', result.inserted, 'rows to', stat.table);
                        callback(null, JSON.stringify(result, null, 2));
                    });
                });
            });

        });

    });

    async.parallel(requests, function(err, results) {
        if (err) throw err;
        console.log('Success!');
        process.exit();
    });
});

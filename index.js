var _ = require('lodash');
var async = require('async');
var request = require('request');
var r = require('rethinkdb');

var headers = { 'Ocp-Apim-Subscription-Key': 'f05dcf2fe1934b4197174577dfe3068b' };
var stats = [
    require('./lib/final_box_scores'),
    // require('./lib/game_stats'),
    require('./lib/players'),
    require('./lib/season_league_leaders')
];


var options = {
    host: '45.56.91.5',
    port: '28015'
};


r.connect(options, function(err, conn) {
    if (err) throw err;

    _.each(stats, function(stat) {

        var urls = _.flattenDeep(stat.urls);
        _.each(urls, function(url) {

            console.log(url);
            request({ url: url, headers: headers }, function(error, response) {
                console.log(JSON.parse(response));
                if (error) console.log(error);
                r.db(stat.db).table(stat.table)
                .insert(JSON.parse(response.body))
                .run(conn, function(err, result) {
                    if (err) throw err;
                    console.log(JSON.stringify(result, null, 2));
                });
            });

        });

    });

    console.log('Complete!');
    process.exit();
});

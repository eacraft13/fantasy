var _ = require('lodash');
var request = require('request');
var r = require('rethinkdb');



var fantasyUrls = {
    gameStats: 'https://api.fantasydata.net/nfl/v2/JSON/GameStats/2015',
    gameStatsByPlayer: 'https://api.fantasydata.net/nfl/v2/JSON/PlayerGameStatsByPlayerID/2015/6/4314'
};

var rOptions = {
    host: '45.56.91.5',
    port: '28015'
};


r.connect(rOptions, function(err, conn) {
    if (err) console.log(err);
    if (err) throw err;

    var options = {
        url: fantasyUrls.gameStats,
        headers: { 'Ocp-Apim-Subscription-Key': 'f05dcf2fe1934b4197174577dfe3068b' }
    };



    request(options, function(error, response, body) {
        if (error) throw error;

        var results = JSON.parse(response.body);

        _.forEach(results, function(val, key) {
            r.db('nfl').table('game_stats').insert(val)
            .run(conn, function(err, result) {
                if (err) throw err;
                console.log(JSON.stringify(result, null, 2));
            });
        });

        console.log('Complete!');
        process.exit();
    });

});

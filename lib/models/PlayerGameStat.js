var _  = require('lodash');
var db = require(__base + 'bin/player_game_stats');
var r  = require('rethinkdb');

var table = 'player_game_stats';
var index = 'PlayerGameID';


module.exports = {

    create: function(playerGameStats, callback) {
        if ( !Array.isArray(playerGameStats) )
            playerGameStats = [ playerGameStats ];

        db.connect(function(err, conn) {
            r
            .table(table)
            .insert(playerGameStats)
            .run(conn, function(err, results) {
                callback(err, results);
                conn.close(function(err) {
                    if (err) throw err;
                });
            });
        });
    }

};

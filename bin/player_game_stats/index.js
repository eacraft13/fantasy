var _       = require('lodash');
var ocpApim = require(__base + 'bin/rethinkdb');
var r       = require('rethinkdb');

var table = 'player_game_stats';
var index = 'PlayerGameID';

module.exports = {

    table: table,

    connect: function(callback) {
        ocpApim.connect(function(err, conn) {
            if (err) throw err;
            createTable(conn, function(err, result) {
                if (err) throw err;
                if (result) console.log(result);
                createIndex(conn, function(err, result) {
                    if (err) throw err;
                    if (result) console.log(result);
                    callback(null, conn);
                });
            });
        });
    }
    
};

function createTable(conn, callback) {
    r
    .tableList()
    .run(conn, function(err, results) {
        if ( !_.includes(results, table) ) {
            r
            .tableCreate(table)
            .run(conn, callback);
        } else {
            callback(null, null);
        }
    });
}

function createIndex(conn, callback) {
    r
    .table(table)
    .indexList()
    .run(conn, function(err, results) {
        if ( !_.includes(results, index) ) {
            r
            .table(table)
            .indexCreate(index)
            .run(conn, callback);
        } else {
            callback(null, null);
        }
    });
}

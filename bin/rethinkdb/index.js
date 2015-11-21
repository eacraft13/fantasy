var _       = require('lodash');
var options = require(__base + 'config/rethinkdb');
var r       = require('rethinkdb');

var conn = null;

module.exports = {

    db: options.db,

    connect: function(callback) {
        getConnection(function(err, conn) {
            if (err) throw err;
            r
            .dbList()
            .run(conn, function(err, results) {
                if (err) throw err;
                if ( !_.includes(results, options.db) ) {
                    r
                    .dbCreate(options.db)
                    .run(conn, function(err, result) {
                        if (err) throw err;
                        console.log(result);
                        conn.use(options.db);
                        callback(null, conn);
                    });
                } else {
                    conn.use(options.db);
                    callback(null, conn);
                }
            });

        });
    },

};

function getConnection(callback) {
    if (conn) callback(null, conn);
    r.connect(options.connection, function(err, conn) {
        conn = conn;
        callback(err, conn);
    });
}

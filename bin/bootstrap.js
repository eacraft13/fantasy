var r = require('rethinkdb');

var options = {
	host: '45.56.91.5',
	port: 28015
};

r.connect(options, function(err, conn) {
	if (err)
		throw err;
	r.db('nfl').tableCreate('game_stats').run(conn, function(err, res) {
		if (err)
			throw err;
		console.log('Successfully created game_stats!');
	});

});

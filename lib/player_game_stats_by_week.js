var _      = require('lodash');
var season = '2015REG';
var weeks  = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

var urls = _.map(weeks, function(week) {
	return 'https://api.fantasydata.net/nfl/v2/JSON/PlayerGameStatsByWeek/' + season + '/' + week;
});

module.exports = {
    db: 'nfl',
    table: 'player_game_stats_by_week',
    urls: urls
};

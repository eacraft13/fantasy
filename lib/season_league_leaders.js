var _ = require('lodash');


var years = [ 2015, 2014, 2013, 2012, 2011, 2010 ];
var positions = [ 'QB', 'RB', 'WR', 'TE', 'DEFENSE' ];
var column = 'FantasyPoints';


var urls = _.map(years, function(year) {
	return _.map(positions, function(position) {
		return 'https://api.fantasydata.net/nfl/v2/JSON/SeasonLeagueLeaders/' +
			year + '/' + position + '/FantasyPoints';
	});
});

return {
	db: 'nfl',
	table: 'season_league_leaders',
	urls: urls
};

var _ = require('lodash');

var years = [ 2015, 2014, 2013, 2012, 2011, 2010 ];

var urls = _.map(years, function(year) {
    return 'https://api.fantasydata.net/nfl/v2/JSON/GameStats/' + year;
});

module.exports = {
    db: 'nfl',
    table: 'game_stats',
    urls: urls
};

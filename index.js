var request = require('request');


var options = {
  url: 'https://api.fantasydata.net/nfl/v2/JSON/PlayerGameStatsByPlayerID/2015/6/4314',
  headers: {
    'Ocp-Apim-Subscription-Key': 'f05dcf2fe1934b4197174577dfe3068b'
  }
};


request(options, function(error, response, body) {
  if (error)
    return console.log(error);

  var results = JSON.parse(response.body);
  console.log(results);
});

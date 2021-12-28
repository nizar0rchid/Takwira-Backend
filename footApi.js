var request = require('request');




	const options = {
  method: 'GET',
  url: 'https://elenasport-io1.p.rapidapi.com/v2/upcoming',
  qs: {page: '1'},
  headers: {
    'x-rapidapi-host': 'elenasport-io1.p.rapidapi.com',
    'x-rapidapi-key': 'c0b1f624ebmsh68b7c432fb7f924p167801jsn14dc19e4a1a3',
    useQueryString: true
  }
};
exports.data = function getData(req, res){
	request(options, function (error, response, body) {

		var liveMatches = [];
			data = JSON.parse(body);
			var matchesList = data['data'];
		for(let i = 0; i < matchesList.length; i++){
				
				 liveMatches.push(
				 {
				 	country : matchesList[i]['countryName'],
				 	league : matchesList[i]['leagueName'],
				 	venue : matchesList[i]['venueName'],
				 	homeName : matchesList[i]['homeName'],
				 	awayName : matchesList[i]['awayName'],
				 	elapsed : matchesList[i]['elapsed'],
				 	elapsedPlus : matchesList[i]['elapsedPlus'],
				 	team_home_goals : matchesList[i]['team_home_90min_goals'],
				 	team_away_goals : matchesList[i]['team_away_90min_goals']
				 }
				 	);

			}

			res.status(201).json(liveMatches);

	});


}

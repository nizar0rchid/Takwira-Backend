var request = require('request');

exports.data = function getData(){


	const options = {
	  method: 'GET',
	  url: 'https://elenasport-io1.p.rapidapi.com/v2/inplay',
	  qs: {page: '1'},
	  headers: {
	    'x-rapidapi-host': 'elenasport-io1.p.rapidapi.com',
	    'x-rapidapi-key': '7fed2fa1fbmsh5bcc901d16cc9f4p1c4c68jsnb73db43bc5ec',
	    useQueryString: true
	  }
	};

	request(options, function (error, response, body) {

		var liveMatches = [];
			data = JSON.parse(body);
			var matchesList = data['data'];

		for(let i = 0; i < matchesList.length; i++){
				
				 liveMatches.push(
				 {
				 	homeName : matchesList[i]['homeName'],
				 	awayName : matchesList[i]['awayName'],
				 	elapsed : matchesList[i]['elapsed'],
				 	team_home_goals : matchesList[i]['team_home_90min_goals'],
				 	team_away_goals : matchesList[i]['team_away_90min_goals'],
				 	createdAt : Date.now()
				 }
				 	);
			}

			for (let j= 0; j<liveMatches.length;j++){
				console.log(liveMatches[j]);
				console.log("--------------------------------------------");
			}

	});





}

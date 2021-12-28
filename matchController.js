Match = require('./matchModel');

// Handle index actions
exports.index = function (req, res) {
    Match.get(function (err, matches) {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            }

            res.json({
                status: "success",
                message: "Matches retrieved successfully",
                data: matches
            });
        });
    
};


// Handle create contact actions
exports.new = async (req, res)=> {
    var match = new Match();
    match.teamCapacity = req.body.teamCapacity;
    match.stadeId = req.body.stadeId;
    userId = req.body.userId;
    
    var teamA = [];
    var teamB = [];
    teamA.length = match.teamCapacity
    teamB.length = match.teamCapacity
    match.teamA = teamA;
    match.teamB = teamA;

    try {
        //console.log("try statement passed") //debug
            for (var i = 0; i < match.teamCapacity; i++) {
                //console.log("for statement passed") //debug
                if (match.teamA[i] == null){
                    match.teamA[i] = userId;   //remember to change
                    break;
                }
                else
                    break;
            }
            await Match.create(match);
            return res.status(200).json({
            message: 'joined match successfully !',
            data : match
                })
        
    } catch(error) {
            return res.status(500).json({
                message : error
            })
    }

    
};


// Handle view contact info
exports.view = function (req, res) {
    const stadeId = req.params.stade_id;
    Match.findOne({stadeId: stadeId}, function (err, match) {
        if (err)
            res.send(err);

        res.json(match);
    });
};


// join existing match

exports.update = async (req, res) => {
Match.findById(req.params.match_id, function (err, match, user_id) {
        if (err)
            res.send(err);
        team = req.body.team

        user_id = req.body.userId; // passage statique id user (change later)
        

        if (team == "teamA"){
            for (var i = 0; i < match.teamCapacity; i++) {
                if (match.teamA[i] == null && match.teamA[i] != user_id){
                    match.teamA[i] = user_id;
                    break;
                }
            }
        } else if (team == "teamB") {
            for (var i = 0; i < match.teamCapacity; i++) {
                if (match.teamB[i] == null && match.teamB[i] != user_id){
                    match.teamB[i] = user_id;
                    break;
                }
            }
        }
        
        match.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Joined match successfully',
                data: match
            });
        });
    });
};

// cancel match join
exports.cancel = async (req, res) => {
Match.findById(req.params.match_id, function (err, match, user_id) {
        if (err)
            res.send(err);

        team = req.body.team
        
        user_id = req.body.userId; // passage statique id user (change later)
        

        if (team == "teamA"){
            for (var i = 0; i < match.teamCapacity; i++) {
                if (match.teamA[i] == user_id){
                    match.teamA[i] = null;
                    break;
                }
            }
        } else if (team == "teamB") {
            for (var i = 0; i < match.teamCapacity; i++) {
                if (match.teamB[i] == user_id){
                    match.teamB[i] = null;
                    break;
                }
            }
        }
        
        match.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Unjoined match successfully',
                data: match
            });
        });
    });
};





// Handle delete contact
exports.delete = function (req, res) {
    Match.remove({
        _id: req.params.match_id
    }, function (err, match) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'match deleted'
        });
    });
};
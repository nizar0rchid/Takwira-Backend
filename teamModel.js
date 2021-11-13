var mongoose = require('mongoose');
// Setup schema
var teamSchema = mongoose.Schema({
    
    capacity: {
        type: Number,
        required: false
    }

    players: [
        {
            id: {type: Number}
        }
    ],

});
// Export Contact model
var Team = module.exports = mongoose.model('team', teamSchema);
module.exports.get = function (callback, limit) {
    Team.find(callback).limit(limit);
}

///////// a team has a capacity and an array of users IDs

var mongoose = require('mongoose');
// Setup schema
var matchSchema = mongoose.Schema({
    
    teams: [
        {
            id: {type: Number}
        }
    ],

});
// Export Contact model
var Match = module.exports = mongoose.model('team', matchSchema);
module.exports.get = function (callback, limit) {
    Match.find(callback).limit(limit);
}

///////// a team has a capacity and an array of users IDs

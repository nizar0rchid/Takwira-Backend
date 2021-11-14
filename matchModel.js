var mongoose = require('mongoose');
// Setup schema
var matchSchema = mongoose.Schema({
    
	teamCapacity: {
        type: Number,
        required: false
    },

    teamA: [{
        type: String
    }],
    
    teamB: [{
        type: String
    }],

});
// Export Contact model
var Match = module.exports = mongoose.model('match', matchSchema);
module.exports.get = function (callback, limit) {
    Match.find(callback).limit(limit);
}



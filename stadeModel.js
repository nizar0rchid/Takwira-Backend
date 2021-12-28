// stadeModel.js
var mongoose = require('mongoose');
// Setup schema
var stadeSchema = mongoose.Schema({
    
    
    DateTime: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    
});
// Export Contact model
var Stade = module.exports = mongoose.model('stade', stadeSchema);
module.exports.get = function (callback, limit) {
    Stade.find(callback).limit(limit);
}
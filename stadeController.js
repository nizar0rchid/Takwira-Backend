
Stade = require('./stadeModel');
// Handle index actions
exports.index = function (req, res) {

    Stade.get(function (err, stades) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json(
            stades
        );
    });
};


exports.pic = async (req, res) => {
Stade.findById(req.params.stade_id, function (err, stade) {
        if (err)
            res.send(err);
        stade.image = req.file.path
// save the contact and check for errors
        stade.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'photo updated successfully',
                data: stade
            });
        });
    });
};





// Handle create contact actions
exports.new = async (req, res) => {
    var stade = new Stade();
    stade.name = req.body.name ? req.body.name : stade.name;
    stade.capacity = req.body.capacity;
    stade.price = req.body.price;
    stade.location = req.body.location;
    stade.phone = req.body.phone;
    stade.DateTime = req.body.DateTime;
    
try {
        await Stade.create(stade);
        return res.status(200).json(stade._id)
    } catch(error) {
        console.log(error);
        //console.log(stade);
        return res.status(500).json({
            message: 'Stade already exists !'
        })
    }
};
// Handle view contact info
exports.view = function (req, res) {
    Stade.findById(req.params.stade_id, function (err, stade) {
        if (err)
            res.send(err);
        res.json(stade);
    });
};
// Handle update contact info
exports.update = function (req, res) {
Stade.findById(req.params.stade_id, function (err, stade) {
        if (err)
            res.send(err);
        stade.name = req.body.name ? req.body.name : stade.name;
        stade.capacity = req.body.capacity;
        stade.price = req.body.price;
        stade.location = req.body.location;
        stade.phone = req.body.phone;
        stade.available = req.body.available;
// save the contact and check for errors
        stade.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Stade Info updated',
                data: stade
            });
        });
    });
};
// Handle delete contact
exports.delete = function (req, res) {
    Stade.remove({
        _id: req.params.stade_id
    }, function (err, stade) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'Stade deleted'
        });
    });
};

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
        res.json({
            status: "success",
            message: "Stades retrieved successfully",
            data: stades
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
    stade.available = req.body.available;
try {
        await Stade.create(user);
        return res.status(200).json({
            message: 'Stade added successfully !',
            data : stade
        })
    } catch(error) {
        console.log("Stade already exists !");
        console.log(stade);
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
        res.json({
            message: 'Stade details loading..',
            data: stade
        });
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
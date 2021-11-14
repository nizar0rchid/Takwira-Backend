
User = require('./userModel');
// Handle index actions



exports.index = function (req, res) {
    User.get(function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Users retrieved successfully",
            data: users
        });
    });
};
// Handle create contact actions
exports.new = async (req, res)=> {
    var user = new User();
    user.firstName = req.body.firstName ? req.body.firstName : user.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.age = req.body.age;
    user.phone = req.body.phone;
    user.location = req.body.location;
    user.role = req.body.role;
    
    try {
        await User.create(user);
        return res.status(200).json({
            message: 'User added successfully !',
            data : user
        })
    } catch(error) {
        console.log("User already exists !");
        console.log(user);
        return res.status(500).json({
            message: 'User already exists !'
        })
    }
};




// Handle view contact info
exports.view = function (req, res) {
    Match.findById(req.params.match_id, function (err, match) {
        if (err)
            res.send(err);
        res.json({
            message: 'Match details loading..',
            data: match
        });
    });
};






exports.update = async (req, res) => {
User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        user.firstName = req.body.firstName ? req.body.firstName : user.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.password = req.body.password;
        user.age = req.body.age;
        user.phone = req.body.phone;
        user.location = req.body.location;
        user.role = req.body.role;
        
// save the contact and check for errors
        user.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'user Info updated',
                data: user
            });
        });
    });
};








// Handle update contact info
exports.update = async (req, res) => {
User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        user.firstName = req.body.firstName ? req.body.firstName : user.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.password = req.body.password;
        user.age = req.body.age;
        user.phone = req.body.phone;
        user.location = req.body.location;
        user.role = req.body.role;
        
// save the contact and check for errors
        user.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'user Info updated',
                data: user
            });
        });
    });
};
// Handle delete contact
exports.delete = function (req, res) {
    User.remove({
        _id: req.params.user_id
    }, function (err, user) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'user deleted'
        });
    });
};
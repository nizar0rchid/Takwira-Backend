var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
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

//profile pic upload
exports.pic = async (req, res) => {
User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        user.profilePic = req.file.path
// save the contact and check for errors
        user.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'photo updated successfully',
                data: user
            });
        });
    });
};


// Sign up 
exports.new = async (req, res)=> {
    try {
    // Get user input
    const { firstName, lastName, email, password, age, phone, location, role} = req.body;

    // Validate user input
    if (!(email && password && firstName && lastName && age && phone && location && role)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exists. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
      age,
      phone,
      location,
      role
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }

};



// login 
exports.login = async (req, res)=> {
    // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(401).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }

};



// Handle view contact info
exports.view = function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        res.status(201).json(user);
    });
};



exports.findemail = function (req, res) {
      const mail = req.params.email;
     User.findOne({email: mail}, function (err, user){
        if (err)
            res.send(err);
        res.status(201).json(user);
        console.log(user);
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




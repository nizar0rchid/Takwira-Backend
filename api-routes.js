// api-routes.js
// Initialize express router
let router = require('express').Router();
const auth = require("./auth");
// Set default API response
router.get('/', auth,function (req, res) {
    res.json({
        status: 'API Is Working',
        message: 'Welcome !',
    });
});
// Import contact controller
var userController = require('./userController');
router.route('/login')
    .post(userController.login)
// Contact routes
router.route('/users')
    .get(auth,userController.index)
    .post(userController.new);
router.route('/users/:user_id')
    .get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete);

 // Import contact controller
var stadeController = require('./stadeController');
// Contact routes
router.route('/stades')
    .get(stadeController.index)
    .post(stadeController.new);
router.route('/stades/:stade_id')
    .get(stadeController.view)
    .patch(stadeController.update)
    .put(stadeController.update)
    .delete(stadeController.delete);


 // Import contact controller
var matchController = require('./matchController');
// Contact routes
router.route('/match')
    .get(matchController.index)
    .post(matchController.new);
router.route('/match/:match_id')
    .get(matchController.view)
    .patch(matchController.cancel)
    .put(matchController.update)
    .delete(matchController.delete);

// var liveMatches = require('./footApi');

// router.route('/live')
//     .get(liveMatches.data);
//Export API routes
module.exports = router;
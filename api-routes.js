// api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Is Working',
        message: 'Welcome !',
    });
});
// Import contact controller
var userController = require('./userController');
// Contact routes
router.route('/users')
    .get(userController.index)
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
// Export API routes
module.exports = router;
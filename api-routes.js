// api-routes.js
// Initialize express router
let router = require('express').Router();
const auth = require("./auth");

const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
      destination(req,file, cb){
          cb(null,'./upload/images')
      },
      filename(req,file,cb){
          cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
      }
  })
  const fileFilter = (req,file,cb)=>{
        if(file.mimetype==='image/jpeg' || file.mimetype ===  'image/jpg'){
              cb(null,true);
        }else{
              cb(null,false);
        }
  }
  const upload = multer({storage: storage,fileFilter: fileFilter
      })




// Set default API response
router.get('/',function (req, res) {
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
    .get(userController.index)  //get(auth,userController.index)
    .post(userController.new);
router.route('/users/:user_id')
    .get(userController.view)
    .patch(userController.update)
    .put(upload.single('image'),userController.pic)
    .delete(userController.delete);
router.route('/find/:email')
    .get(userController.findemail);

 // Import contact controller
var stadeController = require('./stadeController');
// Contact routes
router.route('/stades')
    .get(stadeController.index)
    .post(stadeController.new);
router.route('/stades/:stade_id')
    .get(stadeController.view)
    .patch(stadeController.update)
    .put(upload.single('image'),stadeController.pic)
    .delete(stadeController.delete);


 // Import contact controller
var matchController = require('./matchController');
// Contact routes
router.route('/match')
    .get(matchController.index)
    .post(matchController.new);
router.route('/match/:stade_id')
    .get(matchController.view);
router.route('/match/:match_id')    
    .patch(matchController.cancel)
    .put(matchController.update)
    .delete(matchController.delete);

var liveMatches = require('./footApi');

router.route('/live')
    .get(liveMatches.data);
//Export API routes
module.exports = router;
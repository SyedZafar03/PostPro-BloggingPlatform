const express = require("express");
const multer = require("multer");
const {
    registerController, 
    loginController, 
    authController, 
    postBlogController, 
    getAllBlogsForUserController, 
    deleteBlogController, 
    updateBlogController, 
    getAllBlogsController, 
    updatesLikesController 
} = require("../controller/userController");
const verifyUserToken = require("../middleware/userAuthMiddleware");

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/getuserdata", verifyUserToken, authController);
router.post("/postblog", upload.single('photo'), verifyUserToken, postBlogController);

router.get('/getallblogs', verifyUserToken, getAllBlogsForUserController);
router.delete('/deleteblog/:blogid', verifyUserToken, deleteBlogController);
router.patch('/updateblog/:blogid', upload.single('photo'), verifyUserToken, updateBlogController);
router.get('/getblogs', getAllBlogsController);
router.post('/updatelikes/:blogid', updatesLikesController);

module.exports = router;

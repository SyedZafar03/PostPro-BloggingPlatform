const express = require("express");
const { 
    adminRegister, 
    adminLogin, 
    getAllUsersController, 
    getAllBlogsController, 
    deleteBlogController, 
    deleteUserController 
} = require("../controller/adminController");
const verifyAdminToken = require('../middleware/adminAuthMiddleware'); // Import the admin middleware

const router = express.Router();

// Admin Registration Route
router.post('/register', adminRegister);

// Admin Login Route
router.post('/login', adminLogin);

// Protected routes (requires admin token verification)
router.get('/getallusers', verifyAdminToken, getAllUsersController);
router.get('/getallblogs', verifyAdminToken, getAllBlogsController);
router.delete('/deleteblog/:blogid', verifyAdminToken, deleteBlogController);
router.delete('/deleteuser/:userid', verifyAdminToken, deleteUserController);

module.exports = router;


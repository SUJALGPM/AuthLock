const express = require('express');
const { registerController, loginController } = require('../Controllers/UserController');
const router = express.Router();


//User Register Routes..
router.post('/register', registerController);

//User Login Route...
router.post('/login', loginController);

module.exports = router;
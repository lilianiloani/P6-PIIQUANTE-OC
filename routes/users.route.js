const express = require('express');

const router = express.Router();

const userControler = require('../controllers/users.controller');
router.post('/signup', userControler.signup);
  
router.post('/login', userControler.login);

//router.post('/logout', userControler.logout);


module.exports = router;
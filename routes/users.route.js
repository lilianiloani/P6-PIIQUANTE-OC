const express = require('express');

const router = express.Router();

const userControler = require('../controllers/users.controller');

  // Login route (post)
  router.post('/login', userControler.login);
  // Signup route (post)
  router.post('/signup', userControler.signup);
  // Logout route (post)
  //router.post('/logout', userControler.logout);


module.exports = router;
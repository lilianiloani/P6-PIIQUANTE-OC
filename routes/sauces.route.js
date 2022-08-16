
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const sauceController = require('../controllers/sauces.controller');

const multer = require('../middleware/multer-config');
//const sauce = require('../models/SauceModel');

// Create sauce
//router.post('/create', sauceController.create);
router.get('/', auth, sauceController.list);
router.post('/', auth, multer, sauceController.create);
router.get('/:id', auth,  sauceController.getOne);
router.put('/:id', auth, sauceController.update);
router.delete('/:id', auth,  sauceController.delete);

module.exports = router;
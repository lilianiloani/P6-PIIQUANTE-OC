
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const sauceController = require('../controllers/sauces.controller');

const multer = require('../middleware/multer-config');

router.get('/', auth, sauceController.listSauce);
router.post('/', auth, multer, sauceController.createSauce);
router.get('/:id', auth,  sauceController.getOneSauce);
router.put('/:id', auth, multer, sauceController.modifySauce);
router.delete('/:id', auth,  sauceController.deleteSauce);
router.post('/:id/like', auth, sauceController.likesOrDislikes);

module.exports = router;
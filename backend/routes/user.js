const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const checkUser = require('../middleware/checkUser');
const multer = require('../middleware/multer-config');

router.post('/signup', checkUser.valid, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/getall', auth, userCtrl.getAll);
router.delete('/delete/:id', auth, userCtrl.delete);


module.exports = router;
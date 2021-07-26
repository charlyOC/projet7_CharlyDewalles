const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const checkUser = require('../middleware/checkUser');
const multer = require('../middleware/multer-config');

router.post('/signup', checkUser.valid, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/me/:id', userCtrl.getUser);
router.put('/edit/:id', multer, userCtrl.editUser);
router.get('/getall', userCtrl.getAll);
router.delete('/delete/:id', userCtrl.delete);


module.exports = router;
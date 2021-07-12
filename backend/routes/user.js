const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/me/:id', auth, userCtrl.getUser);
router.get('/getall', userCtrl.getAll);


module.exports = router;
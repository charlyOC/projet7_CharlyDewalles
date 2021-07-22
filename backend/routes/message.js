const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/message');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/postmessage/:id', auth, multer, messageCtrl.createMessage);
router.get('/getmessage', auth, multer, messageCtrl.getMessages);
router.get('/getmessage/:id', auth, multer, messageCtrl.getMessageById);
router.put('/editmessage/:id', auth, multer, messageCtrl.editMessage);
router.delete('/deletemessage/:id', auth, multer, messageCtrl.deleteMessage);



module.exports = router;
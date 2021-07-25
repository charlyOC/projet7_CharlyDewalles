const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/message');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/postmessage/:id', auth, multer, messageCtrl.createMessage);
router.get('/getmessage', messageCtrl.getMessages);
router.get('/getmessage/:id',  messageCtrl.getMessageById);
router.put('/editmessage/:id', messageCtrl.editMessage);
router.delete('/deletemessage/:id', messageCtrl.deleteMessage);



module.exports = router;
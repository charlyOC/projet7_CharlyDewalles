const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/message');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/postmessage', multer, messageCtrl.createMessage);
router.get('/getmessage', auth, messageCtrl.getMessages);
router.get('/getmessage/:id', auth, messageCtrl.getMessageById);
router.put('/editmessage/:id', auth, messageCtrl.editMessage);
router.delete('/deletemessage/:id', auth, messageCtrl.deleteMessage);



module.exports = router;
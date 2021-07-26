const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/message');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.get('/getmessage', auth, messageCtrl.getMessages);
router.get('/getmessage/:id', auth,  messageCtrl.getMessageById);
router.get('/reportedmessage/:id', auth,  messageCtrl.getMessageById);
router.post('/postmessage/:id', auth, multer, messageCtrl.createMessage);
router.put('/report/:id', auth, messageCtrl.reportedMessage);
router.delete('/deletemessage/:id', auth, messageCtrl.deleteMessage);



module.exports = router;
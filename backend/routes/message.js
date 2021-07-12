const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/message');
const auth = require('../middleware/auth');

router.post('/postmessage/:id', messageCtrl.createMessage);
router.get('/getmessage', messageCtrl.getMessage);

module.exports = router;
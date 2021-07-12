const express = require('express');
const router = express.Router();
const db = require('../models');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

exports.createMessage = (req, res) => {
    db.Message.create({
        UserId: req.params.id,
        content: req.body.content,
        attachment: req.body.attachment,
        likes: 0,
    }).then(() => res.status(201).json({ message: 'message crée' }))
    .catch(error => res.status(400).json({ error }));
};


exports.getMessage = (req, res) => {
    db.Message.findAll({
        where: { IdUSERS: req.params.id },
        include: [db.User]
    }).then(() => res.status(201).json({ message: 'message ajouté' }))
    .catch(error => res.status(400).json({ error }));
};
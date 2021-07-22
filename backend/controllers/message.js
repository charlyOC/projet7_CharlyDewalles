const express = require('express');
const router = express.Router();
const db = require('../models');
const sequelize = require('sequelize');
const fs = require('fs');

models = require('../models')
const User = models.user


exports.createMessage = (req, res) => {
    db.Message.create({
        UserId: req.params.id,
        content: req.body.content,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      }).then(() => res.status(200).json({ message: 'message créé' }))
    .catch(error => res.status(400).json({ message: 'echec de la création du message'}));
};

exports.getMessages = (req, res) => {
    const limit = 15
  
    const options = {
      include: [
        {
          model: db.User
        }
      ],
      limit,
      order: [['createdAt', 'DESC']]
    }
  
  
    db.Message.findAll(options)
      .then(messages => res.status(200).json({ messages }))
      .catch(error => res.status(400).json({ error }))
  };

exports.getMessageById = (req, res) => {
    db.Message.findOne({ where: { id: req.params.id },

        include: [
          {
            model: db.User
          }
        ]
    }).then(post => res.status(200).json({ post }))
        .catch(error => res.status(404).json({ error }))
};

exports.editMessage = (req, res) => {
    db.Message.update({
        UserId: req.params.id,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
    },
    {
        where: { id: req.params.id }
    }).then(modifiedMessage => res.status(200).json({ modifiedMessage }))
    .catch(error => res.status(500).json({ error }));
};

exports.deleteMessage = (req, res) => {
  db.Message.destroy({ where: {id: req.params.id} })
  .then(deletedMessage => res.status(200).json({ deletedMessage }))
    .catch(error => res.status(500).json({ error }));
};

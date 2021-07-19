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
        attachment: req.body.attachement,
        likes: 0,

    }).then(() => res.status(201).json({ message: 'message créé' }))
    .catch(error => res.status(400).json({ error }));
};

exports.getMessages = (req, res) => {
    db.Message.findAll({ 
        
        where: sequelize.where(sequelize.fn('DATE', sequelize.col('createdAt')), {
            [sequelize.Op.between]: [
                sequelize.fn('SUBDATE', sequelize.fn('NOW'), 10),
                sequelize.fn('NOW')
            ]
            
        }),
        order: [
            ['createdAt', 'DESC']
        ]

    }).then(messages => res.status(200).json({ messages }))
        
    .catch(error => res.status(500).json({ error }));
};

exports.getMessageById = (req, res) => {
    db.Message.findOne({ where: { id: req.params.id } })
        .then(message => res.status(200).json({ message }))
        .catch(error => res.status(500).json({ error }));
};

exports.editMessage = (req, res) => {
    db.Message.update({
        content: req.body.content,
        attachment: req.body.attachement,
        likes: req.body.likes
    },
    {
        where: { id: req.params.id }
    }).then(modifiedMessage => res.status(200).json({ modifiedMessage }))
    .catch(error => res.status(500).json({ error }));
};

exports.deleteMessage = (req, res) => {
    db.Message.destroy({
        where: {id: req.params.id}
    }).then(deletedMessage => res.status(200).json({ deletedMessage }))
    .catch(error => res.status(500).json({ error }));
};

exports.likeMessage = (req, res) => {
    const likes = req.body.likes;

    const userId = req.body.userId;

    const messageId = req.params.id;

    if (likes === 1) { 

        db.Message.update(
            {
                likes: + 1,
                where: {id: messageId}
            }
        )
        .then(() => res.status(200).json({
            message: "Vous aimez cette sauce !"
        }))
          .catch((error) => res.status(400).json({
            error
        }))
    }
}
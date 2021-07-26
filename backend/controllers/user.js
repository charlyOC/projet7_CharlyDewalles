const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const multer = require('../middleware/multer-config');


exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        db.User.create({
            email : req.body.email,
            password : hash,
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            isAdmin: false,

        }).then(userCreated => {
            res.status(201).json({ 
                userId: userCreated.id,
                firstName: userCreated.firstName,
                lastName: userCreated.lastName,
                isAdmin: userCreated.isAdmin,
                token: jwt.sign(
                    {userId: userCreated.id},
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' }
                ),
            });
        })
        .catch(error => res.status(400).json({ message: 'erreur de token' }));
    })
    .catch(error => res.status(500).json({ message: 'erreur de création' }));
};


exports.login = (req, res) => {
    db.User.findOne
    ({ where: {email: req.body.email} })
    .then(user => {
       if (!user) {
           return res.status(401).json({ error: 'Utilisateur non trouvé'});
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid){
                return res.status(401).json({ error: 'mot de passe incorrect'});
            }
            res.status(200).json({
                userId: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                isAdmin: user.isAdmin,
                token: jwt.sign(
                    {userId: user.id},
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' }
                ),
            });
        })
        .catch(error => status(500).json({ error }))
    })
    .catch(error => status(500).json({ error }))
};

exports.getAll = (req, res) => {
    db.User.findAll({ include: [db.Message] }).then( users => res.send(users))
};

exports.delete = (req, res) => {
    db.User.destroy({ 
        where: { id: req.params.id},
        include: [db.Message]
    })
    .then(() => res.status(201).json({ message: 'Utilisateur supprimé' }))
    .catch(error => res.status(500).json({ message: 'échec de la suppression' }));
}

exports.getUser = (req, res) => {
    db.User.findOne({where:{ id: req.params.id }}).then( users => res.send(users))
};

exports.editUser = (req, res) => {
    db.User.update({ 
        ...req.body,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,

        where: {id: req.params.id},
    }).then(modifiedUser => res.status(200).json({ modifiedUser }))
    .catch(error => res.status(500).json({ error }));
};





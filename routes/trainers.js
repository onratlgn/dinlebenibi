const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Trainer = require('../models/trainer');

// Register
router.post('/register', (req, res, next) => {
  let newTrainer = new Trainer ({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  Trainer.addTrainer(newTrainer, (err, trainer) => {
    if(err) {
      res.json({success: false, msg: 'Failed to register Trainer'});
    } else {
      res.json({success: true, msg: 'Trainer registered'});
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  Trainer.getTrainerByUsername(username, (err, trainer) => {
    if(err) throw err;
    if(!trainer) {
      return res.json({success: false, msg: 'User not found'});
    }

    Trainer.comparePassword(password, trainer.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch) {
        const token = jwt.sign({data: trainer}, config.secret, {
          expiresIn: 604800 // 1 week
        });
        res.json({
          success: true,
          token: 'JWT '+token,
          trainer: {
            id: trainer._id,
            name: trainer.name,
            username: trainer.username,
            email: trainer.email
          }
        })
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({trainer: req.trainer});
});

module.exports = router;

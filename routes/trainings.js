const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Training = require('../models/training');

// Register

router.post('/new', (req, res, next) => {
  let newTraining = new Training ({
    name: req.body.name,
    owner: req.body.owner,
    quota: req.body.quota,
    current: 0,
    date: req.body.date,
    subscriberIDs: []
  });

  Training.addTraining(newTraining, (err, training) => {
    if(err) {
      res.json({success: false, msg: 'Failed to register training'});
    } else {
      res.json({success: true, msg: 'Training registered'});
    }
  });
});

router.post('/about', (req, res, next) => {
    trainerID= req.body.id;
   Training.getTrainingById( trainerID ,(err, training) => {
    if(err) throw err;
    if(!training) {
      return res.json({success: false, msg: 'training not found'});
    }
    res.json({training: training});
     });
    });

router.post('/byOwner', (req, res, next) => {
      owner= req.body.owner;
     Training.getTrainingByOwner( owner ,(err, training) => {
      if(err) throw err;
      if(!training) {
        return res.json({success: false, msg: 'training not found'});
      }
      res.json({training: training});
       });
      });
router.post('/byaTag', (req, res, next) => {
        tag= req.body.tag;
       Training.getTrainingByTag( tag ,(err, training) => {
        if(err) throw err;
        if(!training) {
          return res.json({success: false, msg: 'training not found'});
        }
        res.json({training: training});
         });
        });


module.exports = router;

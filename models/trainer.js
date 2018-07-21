const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Trainer Schema
const TrainerSchema = mongoose.Schema ({
  name: {
    type: String
  },
  surname: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: Number
  },
  city: {
    type: String
  },
  district: {
    type: String
  },
  address: {
    type: String
  },
  trainings:[]
});

const Trainer = module.exports = mongoose.model('Trainer', TrainerSchema);

module.exports.getTrainerById = function(id, callback) {
  Trainer.findById(id, callback);
}

module.exports.getTrainerByUsername = function(username, callback) {
  const query = {username: username}
  Trainer.findOne(query, callback);
}

module.exports.addTrainer = function(newTrainer, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newTrainer.password, salt, (err, hash) => {
      if(err) throw err;
      newTrainer.password = hash;
      newTrainer.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}

const mongoose = require('mongoose');
const config = require('../config/database');

// User Schema
const TrainingSchema = mongoose.Schema ({
  name: {
    type: String
  },
  owner: {
    type: String
  },
  quota: {
    type: Number,
    required: true
  },
  current: {
    type: Number
  },
  date: {
    type: Date
  },
  tags: [String],
  subscriberIDs: [String]
});

const Training = module.exports = mongoose.model('Training', TrainingSchema);

module.exports.getTrainingById = function(id, callback) {
  Training.findById(id, callback);
}

module.exports.getTrainingByOwner = function(owner, callback) {
  const query = {owner: owner}
  Training.find(query, callback);
}
module.exports.getTrainingByTag = function(tag, callback){

  Training.find({tags:{$eq: tag}},callback);
}

module.exports.addTraining = function(newTraining, callback) {
 
      newTraining.save(callback);

}

// edit code is missing

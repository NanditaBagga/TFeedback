const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  Question1: {
    type: String,
  },
  Question2:{
    type:String
  },
  Question3:{
    type:String
  },
  Question4:{
    type:String
  },
  Question5:{
    type:String
  },
  commentQuestion:{
    type:String
  },
  Course:{
    type:String
  },
  senderName:{
    type:String
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
});

const Feedbacks = mongoose.model('Feedbacks', feedbackSchema);

module.exports = Feedbacks;
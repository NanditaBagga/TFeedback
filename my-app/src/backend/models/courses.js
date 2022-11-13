const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const courseSchema = new Schema({
  title: {
    type: String,
  },
  photo:{
    type:String
  },
  createdAt:{
    type:Date,
    default:Date.now
  },
  messages:[{
    title:String,
    from:String,
    userType:String,
    date:{
      type:String
    },
    upvotes:Number,
    upvotesBy:[{
        name:String
      }]
  }]
});

const Courses = mongoose.model('Courses', courseSchema);

module.exports = Courses;
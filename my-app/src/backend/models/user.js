const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
  },
  email:{
    type:String
  },
  mobile:{
    type:String
  },
  password:String,
  type:String,
  key:String,
  specialzation:String,
  bio:String,
  designation:String,
  image:String,
  createdAt:{
    type:Date,
    default:Date.now
  }
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
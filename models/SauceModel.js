const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({

    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },
    manufacturer: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    usersLiked:[ "String<UserId>"],
    usersDisliked:[ "String<UserId>"],
  
  
  });
  
  module.exports = mongoose.model('SauceModel', sauceSchema);
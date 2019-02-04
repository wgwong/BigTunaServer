//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var FoodPost = new Schema({
  id: String,
  imageUri: String,
  description: String,
  //foodItemId: String, //used to reference which food item it is in the restaurant
  priceRange: { type: Number, min: 1, max: 5 },
  recommended: Boolean
});

var Post = new Schema({
  //metadata, autogenerated
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }, //only updated for uploader interactions

  //display info
  uploaderId: String, //required
  restaurantId: String,
  description: String, //required, editable
  location: {
    type: { type: String },
    coordinates: [] 
  }, //required
  tags: [String], //editable
  likedBy: [String], //editable
  commentedBy: [String], //editable
  bookmarkedBy: [String], //editable

  //food items
  items: [FoodPost]
});

Post.index({ location: "2dsphere" });

module.exports = mongoose.model('Post', Post);
//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var FoodInfo = new Schema({
	id: String,
	imageUri: String,
	description: String,
	menuItemId: String, //used to reference which food item it is in the restaurant
	priceRange: { type: Number,
		min: 1,
		max: 5
	},
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
	uploaderId: {
		type: String,
		required: true
	},
	restaurantId: String, //editable
	restaurantRating: { type: Number,
		min: 1,
		max: 5
	}, //editable
	description: {
		type: String,
		required: true
	}, // editable
	location: {
		type: { type: String },
		coordinates: {
			type: [Number],
			required: true}
	},
	tags: {
		type: [String],
		default: []
	}, //editable
	likedBy: {
		type: [String],
		default: []
	}, //editable
	commentedBy: {
		type: [String],
		default: []
	}, //editable
	bookmarkedBy: {
		type: [String],
		default: []
	}, //editable

	//food items
	items: [FoodInfo] //editable
});

Post.index({ location: "2dsphere" });

module.exports = mongoose.model('Post', Post);
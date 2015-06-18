Restaurants = new Meteor.Collection('restaurants', {});

Restaurants.attachSchema(new SimpleSchema({
	name: {
		type: String,
		label: "Name",
		max: 200
	},
	address: {
		type: String,
		label: "Address"
	},
	userId: {
		type: String,
		label: "User id"
	},
	images: {
		type: [Object]
	},
	"images.$.defaultPic": {
		type: Boolean
	},
	"images.$.pic": {
		type: String
	},
	"images.$.submitted": {
		type: Date
	},
}));

Meteor.methods({
	createRestaurant: function(restaurantAttributes) {
		check(this.userId, String);
		check(restaurantAttributes, {
			name: String,
			address: String
		});
		var user = Meteor.user();
		var restaurant = _.extend(restaurantAttributes, {
			userId: user._id,
			images: [{defaultPic: true, pic: 'https://sean-carty.s3-us-west-2.amazonaws.com/missing_screen.png', submitted: new Date()}]
		});

		return Restaurants.insert(restaurant);
	},

	editRestaurant: function(restaurantAttributes) {
		var blankField = function(name, address) {
			if (name === "" || address === "") {
				return true;
			} else {
				return false;
			}
		};
		var notAuthorized = function(userId, restaurantUserId) {
			if (userId !== restaurantUserId) {
				return true
			} else {
				return false
			};
		};

		if (notAuthorized(Meteor.user()._id, restaurantAttributes.userId)){
			throw new Meteor.Error('invalid-edit', 'You are not authorized to edit.');
		} else if (blankField(restaurantAttributes.name, restaurantAttributes.address)) {
			throw new Meteor.Error('invalid-edit', 'Name and address can not be blank.');
		} else {
			return Restaurants.update({_id: restaurantAttributes._id}, {$set: restaurantAttributes});
		}
	},
	deleteRestaurant: function(restaurantAttributes) {
		var notAuthorized = function(userId, restaurantUserId) {
			if (userId !== restaurantUserId) {
				return true
			} else {
				return false
			};
		};
		
		if (notAuthorized(Meteor.user()._id, restaurantAttributes.userId)) {
			console.log('error');
		} else {
			Restaurants.remove({_id: restaurantAttributes._id});
			Router.go('/restaurants');
		}
	},
	clearDefault: function(restaurantAttributes) {
		Restaurants.update({_id: restaurantAttributes._id, "images.defaultPic": true}, {$set: {"images.$.defaultPic": false} }, {multi: true});
	},
	submitted: function(restaurantAttributes) {
		return new Date();
	}
})
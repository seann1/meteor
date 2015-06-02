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
	images: []
}));

Meteor.methods({
	editRestaurant: function(restaurantAttributes) {
		var notAuthorized = function(userId, restaurantUserId) {
			if (userId !== restaurantUserId) {
				return true
			} else {
				return false
			};
		};

		if (notAuthorized(Meteor.user()._id, restaurantAttributes.userId)) {
			console.log("hello");
		} else {
			Restaurants.update({_id: restaurantAttributes._id}, {$set: restaurantAttributes});
		}

		return {
			_id: restaurantAttributes._id
		}
	}
})
Restaurants = new Meteor.Collection('restaurants', {});

if (Meteor.isServer) {
      // wait for 5 seconds
      Meteor._sleepForMs(5000);
    } else {

    }


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
	}
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
			images: [{defaultPic: true, pic: 'https://sean-carty.s3-us-west-2.amazonaws.com/missing_screen.png'}]
		});

		Restaurants.insert(restaurant);
		return restaurant._id
	},

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
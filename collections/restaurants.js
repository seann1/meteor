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
	user_id: {
		type: String,
		label: "User id"
	}
}));
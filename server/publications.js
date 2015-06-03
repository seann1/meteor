Meteor.publish('singleRestaurant', function(id) {
	check(id, String);
	return Restaurants.find(id);
})
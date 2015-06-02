Router.route('/restaurants/new', {
	name: 'newRestaurant',
	data: function () {
		return {
			restaurants: Restaurants.find()
		}
	}
});

Router.route('/restaurants/:_id/edit', {
	name: 'editRestaurant',
	data: function () {
		return Restaurants.findOne({_id: this.params._id})
	}
});

Router.route('/restaurants/:_id', {
	name: 'restaurantPage',
	data: function() { return Restaurants.findOne(this.params._id); }
});
Router.route('/restaurants/new', {
	name: 'newRestaurant',
	data: function () {
		return {
			restaurants: Restaurants.find()
		}
	}
});
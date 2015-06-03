Router.route('/restaurants/:_id/edit', {
	name: 'editRestaurant',
	data: function () {
		var templateData = {
				restaurant: Restaurants.findOne({_id: this.params._id})
			}
			return templateData;
		}
});

Router.route('/restaurants/new', {
	name: 'newRestaurant',
	data: function () {
		return {
			restaurants: Restaurants.find()
		}
	}
});

Router.route('/restaurants/:_id', {
	name: 'restaurantPage',
	data: function() {
			var templateData = {
				restaurant: Restaurants.findOne({_id: this.params._id})
			}
			return templateData;
		}
});
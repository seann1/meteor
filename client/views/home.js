Router.route('home', {
	path: '/',
	template: 'home',
});

Template.home.helpers({
	restaurants: function() {
		return Restaurants.find();
	}
});
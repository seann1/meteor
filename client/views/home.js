Router.route('home', {
	path: '/',
	template: 'home',
});

Template.home.helpers({
	restaurants: function() {
		return Restaurants.find();
	},
	defaultImage: function() {
		function defaultPic(image) {
			if (image.defaultPic === true) {
				return true
			} else {
				return false
			}
		};
		return this.images.filter(defaultPic)[0].pic
	}
});

Template.home.events({
	'click .enter-block': function(e, template) {
		Router.go('/restaurants/'+this._id)
	}
})
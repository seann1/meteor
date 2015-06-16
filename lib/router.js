Router.configure({
	layoutTemplate: 'layout',
  	loadingTemplate: 'loading',
  	notFoundTemplate: 'notFound'
});

Router.route('home', {
	path: '/',
	template: 'home',
});

Router.route('restaurants', {
	path: '/restaurants',
	template: 'restaurants',
	data: function () {
		return {
			restaurants: Restaurants.find()
		}
	},
	onBeforeAction: function () {
		if (!Meteor.user()) {
			this.redirect('/');
		} else {
			this.next();
		}
	}
});

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
	waitOn: function() { 
    return Meteor.subscribe('singleRestaurant', this.params._id);
  	},
	data: function() {
			var templateData = {
				restaurant: Restaurants.findOne({_id: this.params._id})
			}
			return templateData;
		}
});
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

Template.restaurants.helpers({
	selectedRestaurantDoc: function() {
		return Restaurants.findOne({_id: Session.get('selectedDocId')});
	}
});


Template.restaurants.events({
	'click li a': function (e, restaurant) {
		Session.set('selectedDocId', this._id);
		console.log(restaurant);
		console.log(this);
	},
	'click #clear-people': function () {
		Session.set('selectedDocId', null);
	}
});
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

Router.route('/restaurants/:_id', {
	name: 'restaurantPage',
	data: function() { return Restaurants.findOne(this.params._id); }
});

Template.restaurants.helpers({
	selectedRestaurantDoc: function() {
		return Restaurants.findOne({_id: Session.get('selectedDocId')});
	},
	userRestaurants: function() {
		return Restaurants.find({userId: Meteor.userId()})
	}
});


Template.restaurants.events({
	'click li a': function (e, restaurant) {
		Session.set('selectedDocId', this._id);
	},
	'click #clear-people': function () {
		Session.set('selectedDocId', null);
	},
	'change #input': function(event, template) {
    var files = event.target.files;

	uploader.send(files[0], function (error, downloadUrl) {
		if (error) {
    	// Log service detailed response
    		console.error('Error uploading', uploader.xhr.response);
    		alert (error);
  		}
	  	else {
	    	Meteor.restaurants.update(this, {$push: {"images": downloadUrl}});
	  	}
	});
  }
});

Template.editRestaurant.helpers({
	restaurant: function() {
		return this
	}
})

Template.editRestaurant.events({
	'submit form': function(e, template) {
		e.preventDefault();

		var $name = $(e.target).find('[name=name]');
		var $address = $(e.target).find('[name=address]');

		var restaurantProperties = {
			name: $name.val(),
			address: $address.val(),
			userId: this.userId,
			_id: this._id
			
		}

		Meteor.call('editRestaurant', restaurantProperties, function(error, result) {
			if (error) {
				throwError(error.reason);
			} else {
				Router.go('restaurants');
			}
		})

	}
})
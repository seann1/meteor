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
	'click .newRestaurant': function(e, template) {
		Router.go('/restaurants/new');
	},
	'mouseenter .newRestaurant': function(e, template) {
		$(e.target).find('a').css('color', 'white');
	},
	'mouseleave .newRestaurant': function(e, template) {
		$(e.target).find('a').css('color', 'black');
	},
	'mouseenter .restaurantRow': function(e, template) {
		$(e.target).children().css('color', 'black');
	},
	'mouseleave .restaurantRow': function(e, template) {
		$(e.target).find('a').css('color', 'white');
		$(e.target).find('.myRestaurantsAddress').css('color', '#00b575');
	},
	'click .restaurantRow': function(e, template) {
		Router.go('restaurantPage', {_id: this._id});
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
			userId: this.restaurant.userId,
			_id: this.restaurant._id
			
		}

		Meteor.call('editRestaurant', restaurantProperties, function(error, result) {
			if (error) {
				throwError(error.reason);
			} else {
				Router.go('/restaurants/'+ restaurantProperties._id);
			}
		})

	}
});

Template.newRestaurant.onRendered(function() {
	$('.newNameInput').focus();
})

Template.newRestaurant.events({
	'focus .newNameInput': function(e, template) {
		$('.newName').addClass('focusLabel');
	},

	'blur .newNameInput': function(e, template) {
		$('.newName').removeClass('focusLabel');
	},

	'focus .newAddressInput': function(e, template) {
		$('.newAddress').addClass('focusLabel');
		$('.cityState').addClass('glowLabel');
	},

	'blur .newAddressInput': function(e, template) {
		$('.newAddress').removeClass('focusLabel');
		$('.cityState').removeClass('glowLabel');
	},

	'focus .newZipInput': function(e, template) {
		$('.newZip').addClass('focusLabel');
	},

	'blur .newZipInput': function(e, template) {
		$('.newZip').removeClass('focusLabel');
	},

	'submit form': function(e, template) {
		e.preventDefault();

		var $name = $(e.target).find('[name=name]');
		var $address = $(e.target).find('[name=address]');

		var restaurantProperties = {
			name: $name.val(),
			address: $address.val()	
		}

		Meteor.call('createRestaurant', restaurantProperties, function(error, result) {
			if(error) {
				throwError(error.reason);
			} else {
				console.log(result);
				Router.go('/restaurants/'+ result);
			}
		});

	},
	'click .cancelButton': function(e, template) {
		Router.go('/restaurants/');
	}
})
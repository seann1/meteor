var inputTitle = new ReactiveVar();

Template.restaurantTitle.onRendered(function() {
	Session.set('editTitle', false);
});

Template.restaurantTitle.helpers({
	userCanEdit: function() {
		if (Meteor.userId() === this.restaurant.userId) {
			return true
		}
	},
	editTitle: function() {
		if (Session.get('editTitle') === true) {
			return true;
		} else {
			return false;
		}
	}
});

Template.restaurantTitle.events({
	'click .edit-glyph': function() {
		Session.set('editTitle', true);
		Session.set('currentRestaurant', this.restaurant);
	}

});

Template.titleInput.onRendered(function() {
	$('.editTitle').focus();
	inputTitle.set(Session.get('currentRestaurant').name);
});

Template.titleInput.events({
	'keypress .editTitle, keydown .editTitle, keyup .editTitle': function(event, template) {
		inputTitle.set(event.target.value);
	},
	'submit form': function(e, template) {
		e.preventDefault();

		var $name = $(e.target).find('[name=restaurantTitle]');

		var restaurantProperties = {
			name: $name.val(),
			address: this.restaurant.address,
			userId: this.restaurant.userId,
			_id: this.restaurant._id	
		}

		Meteor.call('editRestaurant', restaurantProperties, function(error, result) {
			if (error) {
				throwError(error.reason);
			} else {
				Session.set('editTitle', false);
			}
		});

	},
	'click cancelTitle': function() {
		Session.set('editTitle', false);
	}
});

Template.titleInput.helpers({
	edited: function() {
		var restaurant = Session.get('currentRestaurant');
		if (restaurant.name === inputTitle.get()) {
			return false;	
		} else {
			return true;
		}
	}
});
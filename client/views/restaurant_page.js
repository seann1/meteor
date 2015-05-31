Template.restaurantPage.helpers({
	userCanEdit: function() {
		if (Meteor.userId() === this.userId) {
			return true
		}
	}
})
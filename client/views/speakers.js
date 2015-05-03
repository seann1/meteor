Router.route('speakers', {
	path: '/speakers',
	template: 'speakers',
	data: function () {
		return {
			speakers: Speakers.find()
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

Template.speakers.editingDoc = function() {
	return Speakers.findOne({_id: Session.get("selectedDocId")});
}

Template.speakers.events({
	'click li a': function (e, speaker) {
		Session.set('selectedDocId', this._id);
	},
	'click #clear-people': function () {
		Session.set('selectedDocId', null);
	}
});
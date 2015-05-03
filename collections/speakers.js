Speakers = new Meteor.Collection('speakers', {});

Speakers.attachSchema(new SimpleSchema({
	name: {
		type: String,
		label: "Name",
		max: 200
	},
	birthday: {
		type: Date,
		label: "Birthday",
		optional: true
	}
}));
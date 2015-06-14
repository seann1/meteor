Template.photoGallery.onRendered(function() {
});

Template.photoGallery.helpers({
	currentPic: function() {
		return this.restaurant.images[0]
	}
});

Template.photoGallery.events({
	'click .photoViewerModal': function(e, template) {
		if ($(e.target).hasClass('photoViewerModal'))
			$('.photoViewerModal').remove();
			Session.set('photoViewer', false);
	}
});
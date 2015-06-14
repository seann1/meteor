Template.photoGallery.onRendered(function() {
	$('#carousel').slick({
      dots: true,
      arrows: true
    });
});

Template.photoGallery.helpers({
	restaurantPhotos: function() {
		return this.restaurant.images
	}
});

Template.photoGallery.events({
	'click .photoViewerModal': function(e, template) {
		if ($(e.target).hasClass('photoViewerModal'))
			Session.set('photoViewer', false);
	}
})
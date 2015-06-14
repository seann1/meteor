Template.photoGallery.onRendered(function() {
	$('.photoViewerModal').hide().fadeIn();
	$('#carousel').slick({
      dots: true,
      arrows: true
    });
});

Template.photoGallery.helpers({
	restaurantPhotos: function() {
		return this.restaurant.images
	}
})
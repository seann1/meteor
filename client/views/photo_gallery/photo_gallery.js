Template.photoGallery.onRendered(function() {
	$('.glyphicon-menu-left, .glyphicon-menu-right').hide();
	Session.set('picIndex', 0);
});

Template.photoGallery.helpers({
	currentPic: function() {
		return this.restaurant.images[Session.get('picIndex')]
	}
});

Template.photoGallery.events({
	'mouseenter .photoContainer': function(e, template) {
		$('.glyphicon-menu-left, .glyphicon-menu-right').fadeIn(100);
	},
	'mouseleave .photoContainer': function(e, template) {
		$('.glyphicon-menu-left, .glyphicon-menu-right').fadeOut(100);
	},
	'click .glyphicon-menu-right, click .currentPic': function(e, template) {
		if (Session.get('picIndex') < (this.restaurant.images.length - 1)) {
			var picIndexInc = (Session.get('picIndex') + 1);
			Session.set('picIndex', picIndexInc);
		} else {
			Session.set('picIndex', 0);
		}
	},
	'click .glyphicon-menu-left': function(e, template) {
		if (Session.get('picIndex') > 0) {
			var picIndexInc = (Session.get('picIndex') - 1);
			Session.set('picIndex', picIndexInc);
		} else {
			Session.set('picIndex', (this.restaurant.images.length - 1));
		}
	},  
	'click .photoViewerModal': function(e, template) {
		if ($(e.target).hasClass('photoViewerModal')) {
			$('.photoViewerModal').remove();
			Session.set('photoViewer', false);
		}
	}
});
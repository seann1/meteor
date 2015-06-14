var imageUpload = new ReactiveVar();

Template.restaurantPage.onCreated(function() {
	Session.set('photoViewer', false);
});

Template.restaurantPage.onRendered(function() {
	$('.photoUpload').slideUp(0);
	Session.set('wantDelete', false);

	this.find('.wrapper')._uihooks = {
	    insertElement: function (node, next) {
	    	console.log(node);
	      $(node)
	        .hide()
	        .insertBefore(next)
	        .fadeIn();
	    },
	    removeElement: function (node, next) {
	    	$(node)
	        .fadeOut();
	    }
	}
});

Template.restaurantPage.helpers({
	userCanEdit: function() {
		if (Meteor.userId() === this.restaurant.userId) {
			return true
		}
	},

	restaurant: function() {
		return this.restaurant;
	},

	profilePic: function() {
		var profilePic = _.findWhere(this.restaurant.images, {defaultPic: true});
		return profilePic.pic
	},

	progress: function() {
        var upload = imageUpload.get();
        if (upload)
            return Math.round(upload.progress() * 100);
    },

    success: function() {
    	var upload = imageUpload.get();
    	if ($("#input").val() !== ('' || undefined)) {
	    	if (upload.progress() * 100 === 100) {
	    		$("#input").val('');
	    		return true;
	    	}
	    }
    },
    
    wantDelete: function () {
    	if (Session.get('wantDelete') === false) {
    		return false;
    	} else {
    		return true;
    	}
    },

    photoViewer: function() {
    	if (Session.get('photoViewer') === false) {
    		return false;
    	} else {
    		return true;
    	}
    }	
});

Template.restaurantPage.events({
	'change #input': function(event, template) {
		var metaContext = Restaurants.findOne({_id: this.restaurant._id});
    	var uploader = new Slingshot.Upload("myFileUploads", metaContext);
    	var id = this.restaurant._id;
		uploader.send(document.getElementById('input').files[0], function (error, downloadUrl) {
			if (error) {
	    	// Log service detailed response
	    		console.log("bad");
	    		alert (error);
	  		}
		  	else {
		  		imageUpload.set(uploader);
		  		Meteor.call('clearDefault', metaContext, function(error, result) {
		  			if (error) {
		  				console.log("bad");
		  			} else {
		  				Restaurants.update({_id: metaContext._id}, {$push: { images: {"defaultPic": true, "pic": downloadUrl} }});
		  			}
		  		});
		  	}
		});
  	},

  	'mouseenter .profile-background': function(event, template) {
  		$('.photoUpload').slideDown(500);
  	},

  	'mouseleave .profile-background': function(event, template) {
  		$('.photoUpload').slideUp(500);
  	},

  	'click .profile-background': function(event, template) {
  		imageUpload.set();
  	},
  	'click .deleteRestaurant': function(event, template) {
  		Session.set('wantDelete', true);
  	},
  	'click .noDelete': function(event, template) {
  		Session.set('wantDelete', false);
  	},
  	'click .delete': function(event, template) {
		Meteor.call('deleteRestaurant', this.restaurant, function(error, result) {

		});  		
  	},
  	'click .profilePic': function(e, template) {
  		Session.set('photoViewer', true);
  	}
});
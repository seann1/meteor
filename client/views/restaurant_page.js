var imageUpload = new ReactiveVar();

Template.restaurantPage.onRendered(function() {
	$('.buttonMove').slideUp(0);
});

Template.restaurantPage.helpers({
	userCanEdit: function() {
		console.log(Meteor.userId())
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
	progress: function () {
        var upload = imageUpload.get();
        if (upload)
            return Math.round(upload.progress() * 100);
    },
    success: function () {
    	var upload = imageUpload.get();
    	if (upload.progress() * 100 === 100) {
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
  		$('.buttonMove').slideDown(500);
  	},
  	'mouseleave .profile-background': function(event, template) {
  		$('.buttonMove').slideUp(500);
  	}
});
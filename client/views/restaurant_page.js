var imageUpload = new ReactiveVar();

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
        	console.log(upload.progress());
            return Math.round(upload.progress() * 100);
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
		    	Restaurants.update({_id: metaContext._id}, {$push: {"images": downloadUrl}});
		  	}
		  	imageUpload.set(uploader);
		});
  	},
  	'mouseenter .profile-background': function(event, template) {
  		$('.photoUpload').animate({'bottom': '0px'}, 500);
  	},
  	'mouseleave .profile-background, click .profile-background': function(event, template) {
  		$('.photoUpload').animate({'bottom': '-50px'}, 500);
  	}
});
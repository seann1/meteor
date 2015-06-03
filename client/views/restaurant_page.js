Template.restaurantPage.helpers({
	userCanEdit: function() {
		console.log(Meteor.userId())
		if (Meteor.userId() === this.restaurant.userId) {
			return true
		}
	},
	restaurant: function() {
		return this.restaurant;
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
		  		console.log(metaContext);
		    	Restaurants.update({_id: metaContext._id}, {$push: {"images": downloadUrl}});
		  	}
		});
  	}
});


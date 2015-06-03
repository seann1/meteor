Template.restaurantPage.onRendered( function() {

	Template.restaurantPage.helpers({
		userCanEdit: function() {
			console.log(Meteor.userId())
			if (Meteor.userId() === this.restaurant.userId) {
				return true
			}
		}
	});

});


Template.restaurantPage.events({
	'change #input': function(event, template) {
    	var uploader = new Slingshot.Upload("myFileUploads");

		uploader.send(document.getElementById('input').files[0], function (error, downloadUrl) {
			if (error) {
	    	// Log service detailed response
	    		console.error('Error uploading', uploader.xhr.response);
	    		alert (error);
	  		}
		  	else {
		  		console.log(this.restaurant);
		    	Meteor.restaurants.update(this.restaurant._id, {$push: {"images": downloadUrl}});
		  	}
		});
  	}
});
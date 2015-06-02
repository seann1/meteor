Template.restaurantPage.helpers({
	userCanEdit: function() {
		if (Meteor.userId() === this.userId) {
			return true
		}
	}
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
		    	Meteor.restaurants.update(this._id, {$push: {"images": downloadUrl}});
		  	}
		});
  	}
})
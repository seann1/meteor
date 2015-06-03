Template.restaurantPage.onRendered( function() {

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
	    	var uploader = new Slingshot.Upload("myFileUploads");

			uploader.send(document.getElementById('input').files[0], function (error, downloadUrl) {
				if (error) {
		    	// Log service detailed response
		    		console.log("bad");
		    		alert (error);
		  		}
			  	else {
			  		console.log(Session.get('restaurant'));
			    	Meteor.restaurants.update(Session.get('restaurant')._id, {$push: {"images": downloadUrl}});
			  	}
			});
	  	}
	});

});
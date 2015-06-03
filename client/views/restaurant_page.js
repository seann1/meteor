Template.restaurantPage.onCreated(function () {
	console.log(this.data);

	if (this.data.restaurant.images.length < 1) {
		Restaurants.update({_id: this.data.restaurant._id}, {$push: {"images": "https://sean-carty.s3-us-west-2.amazonaws.com/missing_screen.png"}} )
	}
})

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

Template.restaurantPage.rendered = function() {
	$('.restaurantImage').css("background-image", "url(" + this.data.restaurant.images[0] + ")");
	$('.restaurantImage').css("background-repeat", "none");
}
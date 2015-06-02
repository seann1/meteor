var restaurantHooks = {	
	before: {
		insert: function(doc) {
		  if(Meteor.userId()){
		    doc.userId = Meteor.userId();
		  }
		  
		  return doc;
		}
	},
	onSuccess: function(operation, result, template) {
	    Router.go("/restaurants");
	}
}
 
AutoForm.addHooks('insertRestaurantForm', restaurantHooks);

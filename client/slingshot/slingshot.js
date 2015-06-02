var uploader = new Slingshot.Upload("myFileUploads");

uploader.send(document.getElementById('input').files[0], function (error, downloadUrl) {
  if (error) {
    // Log service detailed response
    console.error('Error uploading', uploader.xhr.response);
    alert (error);
  }
  else {
    Meteor.restaurants.update(Meteor.userId(), {$push: {"images": downloadUrl}});
  }
});
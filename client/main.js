import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '../lib/collections.js';

Template.profile.helpers({
  profAll(){
    return userDB.find({});
  }
})
Template.profile.events({
  'click .js-like'(event, instance) {
  	console.log("You clicked like");
var profID = this._id;
var numLikes = userDB.findOne({_id: profID}).like;
if(!numLikes) {
  numLikes = 0;
}
console.log("You have", numLikes);
    userDB.update({_id:profID}, {$set:{'like': numLikes + 1}})
  },
  'click .js-dislike'(event, instance){
  	alert("Dislike!? :'(");
    var profID = this._id;
var numDislikes = userDB.findOne({_id: profID}).dislike;
if(!numDislikes) {
  numDislikes = 0;
}
userDB.update({_id:profID}, {$set:{'dislike': numDislikes + 1}})
console.log("You have", numDislikes);
      
  }, 

  'click.js-profedit'(event, instance){
    $("#editmodal").modal('show');
    console.log("open modal");
  },

  'click .js-delete'(event, instance){
    var profID = this._id
    $("#" + profID).fadeOut("slow","swing", function (){
      userDB.remove({_id: profID});  
    });
    
  },
  'click .js-viewProfile'(event, instance){
  var uID = this._id;
  var Likes = userDB.findOne({_id:uID}).like;
  
  console.log(uID);
  $('#userId').val(uID);

  $('#profileImage').attr('scr',userDB.findOne({_id:uID}).img);
  $('#likes').html(Likes);
  $('#first').text(userDB.findOne({_id:uID}).firstName);
  $('#last').text(userDB.findOne({_id:uID}).lastName);
}
});



Template.addProfile.events({
'click .js-saveProfile'(event, instance){
	var fname = $("#addUserModal input[name='firstName']").val();
	var lname = $("#addUserModal input[name='lastName']").val();
	var profilepic = $("#addUserModal input[name='profileImage']").val();
	console.log("The name is",fname, lname);
	console.log(profilepic);

	$("#exampleModal input[name='firstName']").val('');
	$("#exampleModal input[name='lastName']").val('');
	$("#exampleModal input[name='profileImage']").val('');
  
  	$("#exampleModal").modal("hide");
    userDB.insert({'firstName':fname,
        'lastName':lname, 'img':profilepic});

  	
  },

});
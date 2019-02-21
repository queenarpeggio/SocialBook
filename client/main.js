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
console.log("You have", numDislikes);
    userDB.update({_id:profID}, {$set:{'dislike': numDislikes + 1}})  
  }, 
  'click .js-delete'(event, instance){
    var profID = this._id
    $("#" + profID).fadeOut("slow","swing", function (){
      userDB.remove({_id: profID});  
    });
    
  },
});



Template.addProfile.events({
'click .js-saveProfile'(event, instance){
	var fname = $("#exampleModal input[name='firstName']").val();
	var lname = $("#exampleModal input[name='lastName']").val();
	var profilepic = $("#exampleModal input[name='profileImage']").val();
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
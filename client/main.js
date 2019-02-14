import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '../lib/collections.js';

Template.profile.helpers({
  proffname(){
    return userDB.findOne({}).firstName;
  }
})
Template.profile.events({
  'click .js-like'(event, instance) {
  	console.log("You clicked like")
  },
  'click .js-dislike'(event, instance){
  	alert("Dislike!? :'(");  
  } 
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
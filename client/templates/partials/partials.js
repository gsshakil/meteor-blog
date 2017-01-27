Template.navbar.events({
	'click .btn-logout': function(){
		Meteor.logout();
		Router.go('/login');
		FlashMessages.sendSuccess('Loggedout Succesfully');
	}
});

Template.navbar.helpers({
  	username: function() {
    	return Meteor.user().username;
  	},
  	profilePic: function(){
		return Meteor.user().profile.profilePic;		
	},
});
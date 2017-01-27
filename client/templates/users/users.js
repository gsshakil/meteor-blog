Template.register.events({
	"submit .form-signup" : function(event){

		event.preventDefault();

		var username= trimInput(event.target.username.value);
		var email= trimInput(event.target.email.value);
		var password= trimInput(event.target.password.value);
		var password2= trimInput(event.target.password2.value);
		var createdAt = new Date();

		
		if (isNotEmpty(username) && 
			isNotEmpty(email) && 
			isNotEmpty(password) 
			&& isNotEmpty(password2) 
			&& checkPassword(password, password2)){

				Accounts.createUser({
				email: email, 
				password : password,
				username: username
					// profile: {
					// 	first_name: first_name;
					// 	last_name: last_name;
					// }
			
				},function(err){
				 
		          if (err) {
		  			FlashMessages.sendError(err);
		          } else {
	 			 	FlashMessages.sendSuccess("Account Created Successfuly");
		 			Router.go('/dashboard')
	 			  }

		        });

			event.target.username.value = '';
			event.target.email.value = '';
			event.target.password.value = '';
			event.target.password2.value = '';
		}

		return false;		
	}
});

Template.login.events({
	"submit .form-signin" : function(event){

		event.preventDefault();

		var email= trimInput(event.target.email.value);
		var password= trimInput(event.target.password.value);

		Meteor.loginWithPassword(email, password,function(err){

          if (err) {
  				FlashMessages.sendError(err);
          } else {
 			 	toastr.success("Logged In Successfuly");
 			 	event.target.email.value = '';
				event.target.password.value = '';
 			 	Router.go('/dashboard')
          }

        });

		return false;		
	}
});



//Edit Profile
Template.edit_profile.events({
	
	"submit .form-profile" : function(event){

		event.preventDefault();

		var username = event.target.username.value;
		var first_name= event.target.first_name.value;
		var last_name= event.target.last_name.value;
		var bio= event.target.bio.value;
		var facebook = event.target.facebook.value;
		var google = event.target.google.value;
		var twitter = event.target.twitter.value;
		var website = event.target.website.value;

		var file = $('#profilePic').get(0).files[0];

		if(file){

			fsFile= new FS.File(file);
			ProfilePic.insert(fsFile, function(err, result){
				
				if(!err){
					var profilePic = '/cfs/files/ProfilePic/' + result._id;
	
					Meteor.users.update({
					_id:Meteor.user()._id}, 
					{ $set: {
						// username: username,
						profile: {
			                first_name: first_name,
			                last_name: last_name,
			                bio: bio,
			                profilePic: profilePic,
			                facebook: facebook,
			                google: google,
			                twitter: twitter,
			                website: website
			    		}
					}});

					FlashMessages.sendSuccess('Profile Updated Succesfully');
					Router.go('/dashboard');
				}
			});	

		} else {

				var profilePic = '/img/profile1.jpg';

				Meteor.users.update({
				_id:Meteor.user()._id}, 
				{ $set: {
					// username: username,
					profile: {
		                first_name: first_name,
		                last_name: last_name,
		                bio: bio,
		                profilePic: profilePic,		                
		                facebook: facebook,
		                google: google,
		                twitter: twitter,
		                website: website
		    		}
				}});

				toastr.success('Profile Updated Succesfully');
				Router.go('/dashboard');
			}
			
		return false;
	}
});


// Edit Profile
Template.edit_profile.helpers({
	user: function(){
		return Meteor.users.find();
	},
	username: function(){
		return Meteor.user().username;
	},
	email: function(){
		return Meteor.user().emails[0].address;
	},
	first_name: function(){
		return Meteor.user().profile.first_name;
	},
	last_name: function(){
		return Meteor.user().profile.last_name;
	},
	bio: function(){
		return Meteor.user().profile.bio;
	},
	facebook: function(){
		return Meteor.user().profile.facebook;
	},
	google: function(){
		return Meteor.user().profile.google;
	},
	twitter: function(){
		return Meteor.user().profile.twitter;
	},
	website: function(){
		return Meteor.user().profile.website;
	}
});


//Authors List
Template.authors.helpers({
	email: function(){
		return this.emails[0].address;
	},
	name: function(){
		return this.profile.first_name + ' ' + this.profile.last_name;
	},
	profilePic: function(){
		return this.profile.profilePic;		
	},
	bio: function(){
		return this.profile.bio;
	},
	facebook: function(){
		return this.profile.facebook;
	},
	google: function(){
		return this.profile.google;
	},
	twitter: function(){
		return this.profile.twitter;
	},
	website: function(){
		return this.profile.website;
	},
	articleCount: function(){
		return Posts.find({author: this.username}).count();
	}
});

//Authors Widget
Template.author_widget.helpers({
	users: function(){
		return Meteor.users.find();
	},
	email: function(){
		return this.emails[0].address;
	},
	name: function(){
		return this.profile.first_name + ' ' + this.profile.last_name;
	},
	profilePic: function(){
		return this.profile.profilePic;		
	},
	bio: function(){
		return this.profile.bio;
	},
	facebook: function(){
		return this.profile.facebook;
	},
	google: function(){
		return this.profile.google;
	},
	twitter: function(){
		return this.profile.twitter;
	},
	website: function(){
		return this.profile.website;
	},
	articleCount: function(){
		return Posts.find({author: this.username}).count();
	}
});

//Author Profile
Template.authorProfile.helpers({
	username: function(){
		return this.user.username;
	},
	email: function(){
		return this.user.emails[0].address;
	},
	name: function(){
		return this.user.profile.first_name + ' ' + this.user.profile.last_name;
	},
	profilePic: function(){
		return this.user.profile.profilePic;		
	},
	bio: function(){
		return this.user.profile.bio;
	},
	facebook: function(){
		return this.user.profile.facebook;
	},
	google: function(){
		return this.user.profile.google;
	},
	twitter: function(){
		return this.user.profile.twitter;
	},
	website: function(){
		return this.user.profile.website;
	},
	articles: function(){
		return Posts.find({author: this.user.username},{sort:{createdAt:-1}});
	},
	articleCount: function(){
		return Posts.find({author: this.user.username}).count();
	}
});

// Dashboard
Template.dashboard.helpers({
	user: function(){
		return Meteor.users.find({});
	},
	username: function(){
		return Meteor.user().username;
	},
	email: function(){
		return Meteor.user().emails[0].address;
	},
	name: function(){
		return Meteor.user().profile.first_name + ' ' + Meteor.user().profile.last_name;
	},
	profilePic: function(){
		return Meteor.user().profile.profilePic;		
	},
	bio: function(){
		return Meteor.user().profile.bio;
	},
	facebook: function(){
		return Meteor.user().profile.facebook;
	},
	google: function(){
		return Meteor.user().profile.google;
	},
	twitter: function(){
		return Meteor.user().profile.twitter;
	},
	website: function(){
		return Meteor.user().profile.website;
	},
	articles: function(){
		return Posts.find({author: Meteor.user().username},{sort:{createdAt:-1}});
	},
	articleCount: function(){
		return Posts.find({author: Meteor.user().username}).count();
	}
});

// trim helper
  var trimInput = function(val) {
    return val.replace(/^\s*|\s*$/g, "");
  }

//check if both passwords matchs
var checkPassword = function(p1,p2){
	if(p1 == p2){
		return true;
	} else {
		toastr.error("Passwords do not match");
		return false;
	}
}

//check for the empty fields
isNotEmpty = function(value){
	if(value && value !== ''){
		return true;
	}
	toastr.error("Please fill in all fields");
	return false;
}




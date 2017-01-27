AdminConfig = { 
	adminEmails: ['	gsarwarshakil@gmail.com'], 
	collections: { 
		Posts: {} 
	} 
}

FlashMessages.configure({
    autoHide: true,
    hideDelay: 1000,
    autoScroll: true
 });

Template.registerHelper('formateDate', function(date){
	return moment(date).format('MMMM Do YYYY, h:mm:ss a');
});

Template.registerHelper('capFirst', function(text){
	return text.charAt(0).toUpperCase()+text.slice(1);
});

username = function(){
	return Meteor.user().username;
}
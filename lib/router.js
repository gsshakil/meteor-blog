Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function(){


// ===========================Home Routes===============================

	// Home Route
	this.route('home',{
		path: '/',
		template: 'home'
	});


// ===========================Authentication Routes===============================

	// Login Route
	this.route('login',{
		path: '/login',
		template: 'login'
	});

	// Register Route
	this.route('register',{
		path: '/register',
		template: 'register'
	});

	// Forget Password Route
	this.route('forget_password',{
		path: '/forget_password',
		template: 'forget_password'
	});

	
// ===========================Post Routes===============================

	// Post List Route
	this.route('posts',{
		path: '/posts',
		template: 'posts',
		data: function(){
			templateData= {
				posts: Posts.find({}, {limit:-1, sort:{createdAt: -1}})
			};
			return templateData;
		}
	});

	// Add Post Route
	this.route('add_post',{
		path: '/posts/add',
		template: 'add_post',
		onBeforeAction: function(){
	        var currentUser = Meteor.userId();
	        if(currentUser){
	            this.next();
	        } else {
	            Router.go('/login')
	        }
	    },
		data: function(){
			templateData= {
				categories: Categories.find({}, {sort:{createdAt: -1}})
			};
			return templateData;
		}
	});

	// Edit Post Route
	this.route('edit_post',{
		path: '/posts/edit/:_id',
		template: 'edit_post',
		onBeforeAction: function(){
	        var currentUser = Meteor.userId();
	        if(currentUser){
	            this.next();
	        } else {
	            Router.go('/login')
	        }
	    },
		data: function(){
			templateData= {
				posts: Posts.findOne({_id: this.params._id}),
				categories: Categories.find({}, {sort:{createdAt: -1}})
			};
			return templateData;
		}
	});

	// Post Single Route
	this.route('postSingle',{
		path: '/posts/:slug',
		template: 'postSingle',
		data: function(){
			templateData={
				postSingle: Posts.findOne({slug: this.params.slug})
			};
			return templateData;	
		} 
	});



// ===========================Categories Routes===============================
	
	// Categories Route
	this.route('categories',{
		path: '/categories',
		template: 'categories',
		data: function(){
			templateData={
				categories: Categories.find({}, {sort:{createdAt: -1}})
			};
			return templateData;
		}
	});

	// Categories Single Route
	this.route('category_posts',{
		path: '/categories/:slug',
		template: 'category_posts',
		data: function(){
			templateData={
				category_post: Posts.find({
					category: this.params.slug
				},{sort:{createdAt: -1}}),
				category: Categories.findOne({slug: this.params.slug}),
				postCount: Posts.find({category: this.params.slug}).count()
			};
			return templateData;
		}
	});

	// Add Category Route
	this.route('add_categories',{
		path: '/add_categories',
		template: 'add_categories',
		onBeforeAction: function(){
	        var currentUser = Meteor.userId();
	        if(currentUser){
	            this.next();
	        } else {
	            Router.go('/login')
	        }
	    }
	});


// ===========================Author/User Routes===============================
	

	// Dashboard Route
	this.route('dashboard',{
		path: '/dashboard',
		template: 'dashboard',
		data: function(){
			templateData={
				users: Meteor.users.find()	
			};
			return templateData;
		},
		onBeforeAction: function(){
	        var currentUser = Meteor.userId();
	        if(currentUser){
	            this.next();
	        } else {
	            Router.go('/login')
	        }
	    }
	});

	// Edit Profile
	this.route('edit_profile',{
		path: '/edit_profile',
		template: 'edit_profile',
		onBeforeAction: function(){
	        var currentUser = Meteor.userId();
	        if(currentUser){
	            this.next();
	        } else {
	            Router.go('/login')
	        }
	    }
	});


	// Authors List Route
	this.route('authors',{
		path: '/authors',
		template: 'authors',
		data: function(){
			templateData={
				users: Meteor.users.find()	
			};
			return templateData;
		} 
	});

	// Authors Profile Route
	this.route('authorProfile',{
		path: '/:username',
		template: 'authorProfile',
		data: function(){
			templateData={
				user: Meteor.users.findOne({
					username: this.params.username
				})	
			};
			return templateData;
		} 
	});


});

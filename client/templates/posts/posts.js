Template.comments.helpers({

});	

Template.postThumb.helpers({
	username: function(){
		return this.author;
	}
});

Template.postThumb.events({
	'click .delete-post': function(){
		if(confirm("Do you really want to delete this post?")){
        	Posts.remove({_id: this._id},function(err){
				if(err){
					toastr.error(err);
				} else{
					toastr.success('Post Deleteed Successfully');
				}
			});
        }
	}
});


Template.postSingle.helpers({
	username: function(){
		return this.author;
	}
});

Template.comments.events({
	"submit .post-comment": function(event){
		var text = event.target.commentBox.value;

		Posts.update({
			_id: this._id
		}, { 
			$push: {
				comments:{
					text: text,
					user: Meteor.user().username,
					createdAt: new Date()
				}	
			}
		});

		event.target.commentBox.value = '';

		return false;
	}
});

Template.add_post.events({

	"submit .post-form" : function(event){

		event.preventDefault();

		var title= event.target.title.value;
		var slug = slugify(title);
		var category = event.target.category.value.toLowerCase();
		var body= event.target.body.value;

		var file = $('#postImage').get(0).files[0];
		
		if(file){

			fsFile= new FS.File(file);

			PostImages.insert(fsFile, function(err, result){

				if(!err){

					var postImage = '/cfs/files/PostImages/' + result._id;

				  	Posts.insert({
						title: title,
						slug: slug,
						category: category,
						body : body,
						postImage: postImage,
						userId: Meteor.userId(),
						author : Meteor.user().username,
						createdAt : new Date()
					});
				
					toastr.success("Post Created Successfully");
					Router.go('/posts');
				}
			});

		} else {

			var postImage = '/img/post_img1.jpg';

		  	Posts.insert({
				title: title,
				slug: slug,
				category: category,
				body : body,
				postImage: postImage,
				userId: Meteor.userId(),
				author : Meteor.user().username,
				createdAt : new Date()
			});
		
			toastr.success("Post Created Successfully");
			Router.go('/posts');
		}

		return false;
	}	

});

Template.edit_post.events({

	"submit .post-form" : function(event){

		event.preventDefault();

		var title= event.target.title.value;
		var slug = slugify(title);
		var category = event.target.category.value.toLowerCase();
		var body= event.target.body.value;

	  	Posts.update({
	  		_id: this._id
	  	},{
	  		$set:{
	  			title: title,
				slug: slug,
				category: category,
				body : body,
				// postImage: postImage,
				userId: Meteor.userId(),
				author : Meteor.user().username,
				createdAt : new Date()
	  		}
	  	});
	
		toastr.success("Post Updated Successfully");
		Router.go('/posts');
		
		return false;
	}	

});





Template.listCategories.helpers({

	categories: function(){
		return Categories.find({}, {sort:{createdAt: -1}});
	}
});

Template.add_categories.events({

	'submit .post-categories': function(event,error){
		var title = event.target.title.value;
		var createdAt = new Date();
		var slug = title.toLowerCase();
		
		Categories.insert({
		
			title : title,
			slug:slug,
			createdAt: createdAt
		
		}, function(err){
		
			if(err){
				FlashMessages.sendError(err);
			} else {
				event.target.title.value = '';
				toastr.success("Category Created Successfully");
			}

		});

		return false;
	}
});
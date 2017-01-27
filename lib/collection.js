Posts = new Mongo.Collection('posts');

Categories = new Mongo.Collection('categoris');

PostImages = new FS.Collection("PostImages",{
	stores: [new FS.Store.GridFS("PostImages")]
});


ProfilePic = new FS.Collection("ProfilePic",{
	stores: [new FS.Store.GridFS("ProfilePic")]
});






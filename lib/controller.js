ProfileController=RouteController.extend({
    template:"profile",
    waitOn:function(){
        return Meteor.subscribe("authorProfile",this.params.username);
    },
    data:function(){
        var username=this.params.username;
        return Meteor.users.findOne({username:username});
    }
});
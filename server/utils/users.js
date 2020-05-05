class Users{
    constructor(){
        this.Users=[]
    
    }
    addUser(id,name,room){
        var user={id,name,room};
        this.Users.push(user);
        return user;
    }

    removeUser(id){
      var idx =  this.Users.findIndex((user)=>{
            return user.id===id;
        });
        

        if(idx!=-1){
        var m =this.Users[idx];
        this.Users.splice(idx,1);
            return m;
    }else{
            return [];
        }


    }

    getUser(id){

       var getuser = this.Users.filter((user)=>{
        return user.id===id;
        })

        return getuser;

    }

    getUserList(room){
    
    var users =  this.Users.filter((user)=>{
        return user.room===room;
    });
        
    var namesArreay = users.map((user)=>{
        return user.name;
    });
    
    return namesArreay;

}



}

module.exports={Users}
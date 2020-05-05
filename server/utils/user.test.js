const  expect = require("expect");
const {Users} = require("./users");





describe ("Users",()=>{

var users;


beforeEach(()=>{
  
    users = new Users();
  
    users.Users=[
        {
            id:1,
            name:"Mike",
            room:"Node Course"
        },{
            id:2,
            name:"Jen",
            room:"React Course"
        },
        {
            id:3,
            name:"Julie",
            room:"Node Course"
        }]
})

    it("should add new user",()=>{
        var users = new Users();
        var user={
            id:123,
            name:"gaurav",
            room:"The office"
        };
        var resUser =  users.addUser(user.id,user.name,user.room);
        expect(users.Users).toEqual([user]);
    })

    it("should return names for node course",()=>{
        var userList = users.getUserList("Node Course");

        expect(userList).toEqual(["Mike","Julie"])
    })

    it("should remove a user",()=>{
        
        var user = users.removeUser(1);
    
        expect(user).toEqual({
            id:1,
            name:"Mike",
            room:"Node Course"
        });
        expect(users.Users.length).toBe(2);


    })

    it("should not remove a user",()=>{
        var user = users.removeUser(5);
        expect(users.Users.length).toBe(3);
        

    })

    it("should  find a user",()=>{
        var user = users.getUser(3);
        expect(user).toEqual([{
            id:3,
            name:"Julie",
            room:"Node Course"
        }]);
        expect(user.length).toBe(1);
    })

    it("should not find a user",()=>{
        var user = users.getUser(5 );
        expect(user).toEqual([]);
        expect(user.length).toBe(0);
    })  
})
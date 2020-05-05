 const expect = require("expect");
  var {generate_message,generateLocation_message} = require("./message");

  describe("generate_message",()=>{
      it("should generate correct message object",()=>{

        var res = generate_message("gaurav","lokesh");
        expect(res.from).toEqual("gaurav");
        expect(res.text).toEqual("lokesh");
        expect(res.createdAt).toBeA("number");

      })
  })

  
  describe("generateLocation_message",()=>{
    it("should generate correct message object",()=>{

      var from="gaurav";
      var lattitude=15;
      var longitude=19;

      var url="https://www.google.com/maps?q=15,19"
      var message=generateLocation_message(from,
        lattitude,longitude)

        expect(message.createdAt).toBeA("number");
        expect(message).toInclude({from,url});

 })
})
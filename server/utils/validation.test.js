const expect = require("expect");
const {isRealString} = require("./validation");



describe("username and roomvalidation",()=>{

 it("should accept string values",()=>{

    const res =isRealString("gaurav");
    expect(res).toBe(true);


 })
   
 it("should not accept  nonstring values",()=>{

    const res =isRealString(123);
    expect(res).toBe(false);

    
 })

 it("should not accept empty string values",()=>{

    const res =isRealString("        ");
    expect(res).toBe(false);

 })
})
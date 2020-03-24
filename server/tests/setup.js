import chai from "chai";
import chaiHttp from "chai-http";

chai.should();
chai.use(chaiHttp); 
describe('test suite', () => {
  it('test case', () => {
    console.log("This test is Running")
  });
});

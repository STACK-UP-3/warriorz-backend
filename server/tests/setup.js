import chai from "chai";
import chaiHttp from "chai-http";

chai.should();
chai.use(chaiHttp); 

const { expect } = chai

describe('test suite', () => {
  it('test case', () => {
    expect(true).to.be.equal(true);
  });
});

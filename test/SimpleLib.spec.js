var SimpleLib = artifacts.require("./SimpleLib.sol");

contract("SimpleLib", accounts => {
  it("should have an instance of SimpleLib", () => {
    return SimpleLib.new(0).then(instance => assert.isTrue(!!instance.address));
  });

  it("should SimpleLib default value to 0", () => {
    return SimpleLib.new(0)
      .then(instance => instance.getVersion.call())
      .then(result => assert.equal(result.valueOf(), 0));
  });

  it("should SimpleLib set default value to 12345", () => {
    return SimpleLib.new(12345)
      .then(instance => instance.getVersion.call())
      .then(result => assert.equal(result.valueOf(), 12345));
  });
});

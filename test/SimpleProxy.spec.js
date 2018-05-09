var SimpleProxy = artifacts.require("./SimpleProxy.sol");
var SimpleLib = artifacts.require("./SimpleLib.sol");

contract("SimpleProxy", accounts => {
  it("should have an instance of SimpleProxy", () => {
    return SimpleLib.new(1)
      .then(instance => instance.address)
      .then(libAddress => SimpleProxy.new(libAddress))
      .then(instance => assert.isTrue(!!instance.address));
  });

  it("should SimpleProxy/SimpleLib default value to 0", () => {
    return SimpleLib.new(0)
      .then(instance => instance.address)
      .then(libAddress => SimpleProxy.new(libAddress))
      .then(instance => instance.getVersion.call())
      .then(result => assert.equal(result.valueOf(), 0));
  });

  it("should SimpleProxy/SimpleLib default value to 12345", () => {
    return SimpleLib.new(12345)
      .then(instance => instance.address)
      .then(libAddress => SimpleProxy.new(libAddress))
      .then(instance => instance.getVersion.call())
      .then(result => assert.equal(result.valueOf(), 12345));
  });

  it("should SimpleProxy update SimpleLib version", () => {
    const LIB_PARAM_1 = 12345;
    const LIB_PARAM_2 = 67890;
    let libAddress1, libAddress2, simpleProxy;

    return (
      SimpleLib.new(LIB_PARAM_1)
        .then(instance => (libAddress1 = instance.address))
        .then(() => SimpleLib.new(LIB_PARAM_2))
        .then(instance => (libAddress2 = instance.address))
        .then(() => SimpleProxy.new(libAddress1))
        .then(instance => (simpleProxy = instance))

        // Check the first version 1 is here
        .then(() => simpleProxy.getVersion.call())
        .then(result => assert.equal(result.valueOf(), LIB_PARAM_1))

        // Update to version 2
        .then(() => simpleProxy.setLib(libAddress2))

        // Check the first version 2 is here
        .then(() => simpleProxy.getVersion.call())
        .then(result => assert.equal(result.valueOf(), LIB_PARAM_2))
    );
  });
});

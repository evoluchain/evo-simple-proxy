var SimpleProxy = artifacts.require("./SimpleProxy.sol");
var SimpleLib = artifacts.require("./SimpleLib.sol");
var SimpleSC = artifacts.require("./SimpleSC.sol");

contract("SimpleSC", accounts => {
  it.only("should use update from simpleCS", () => {
    const LIB_PARAM_1 = 12345;
    const LIB_PARAM_2 = 67890;
    let libAddress1, libAddress2, simpleProxy, simpleSC;

    return (
      SimpleLib.new(LIB_PARAM_1)
        .then(instance => (libAddress1 = instance.address))
        .then(() => SimpleLib.new(LIB_PARAM_2))
        .then(instance => (libAddress2 = instance.address))

        // Create SimpleProxy instance
        .then(() => SimpleProxy.new(libAddress1))
        .then(instance => (simpleProxy = instance))

        // Create SimpleSC instance
        .then(() => SimpleSC.new(simpleProxy.address))
        .then(instance => (simpleSC = instance))

        // Check the first version 1 is here - ON SC
        .then(() => simpleSC.getVersion.call())
        .then(result => assert.equal(result.valueOf(), LIB_PARAM_1))

        // Update to version 2 - ON PROXY
        .then(() => simpleProxy.setLib(libAddress2))

        // Check the first version 2 is here - ON SC
        .then(() => simpleProxy.getVersion.call())
        .then(result => assert.equal(result.valueOf(), LIB_PARAM_2))
    );
  });
});

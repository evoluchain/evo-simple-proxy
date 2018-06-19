var SimpleLib = artifacts.require("./SimpleLib.sol");
var SimpleProxy = artifacts.require("./SimpleProxy.sol");
var SimpleCS = artifacts.require("./SimpleSC.sol");

module.exports = function(deployer) {
    deployer.deploy(SimpleLib, 1)
    .then(function() { 
        return  deployer.deploy(SimpleProxy, SimpleLib.address)
            .then(function() { 
                return  deployer.deploy(SimpleCS, SimpleProxy.address);
            } );
    } );
  };
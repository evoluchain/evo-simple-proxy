pragma solidity ^0.4.17;

import './SimpleLib.sol';

contract SimpleSC {
    
    address proxy;

    constructor(address _proxy) public {
      proxy = _proxy;
    }

  function getVersion() public view returns(uint value) {
      uint version = SimpleLib(proxy).getVersion();
      return version;
    }

}
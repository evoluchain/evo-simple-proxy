pragma solidity ^0.4.17;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';
import './SimpleLib.sol';

contract SimpleProxy is Ownable {
  
  address lib;

  constructor(address _lib) public {
      lib = _lib;
    }

  function setLib(address _lib) public onlyOwner {
      lib = _lib;
    }

  function getVersion() public view returns(uint value) {
      uint version = SimpleLib(lib).getVersion();
      return version;
    }

}
pragma solidity ^0.4.17;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';


contract SimpleLib is Ownable {
  
  uint version;

  constructor(uint _version) public {
      version = _version;
    }

  function getVersion() public view returns(uint value) {
      return version;
    }

}

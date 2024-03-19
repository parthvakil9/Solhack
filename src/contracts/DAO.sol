// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DAO {
  constructor() payable{}
  mapping(address => uint) public balances;

  function deposit(address _to) public payable {
    balances[_to] = balances[_to] += msg.value;
  }
  function withdraw(uint _amount) public {
    if(balances[msg.sender] >= _amount) {
      (bool res,) = msg.sender.call{value:_amount}("");
      unchecked{
      balances[msg.sender] -= _amount;
      }
    }
  }

  receive() external payable {}
}



// pragma solidity ^0.8.0;

// contract DAO{
//     mapping(address => uint) public balances;

//     function deposit() public payable{
//         balances[msg.sender] = balances[msg.sender] + msg.value;
//     }
//     function withdraw(uint amount) public{
//         if (balances[msg.sender] >= amount && amount > 0){
//             (bool result,) = msg.sender.call{value: amount}("");
//             if (result){
//                 amount;
//             }
//             unchecked{balances[msg.sender] = balances[msg.sender] - amount;}
//         }


//     }

// }
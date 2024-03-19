// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract ERCtoken is ERC20("C-Token", "CTK"){
    bool public lock;
    function getToken() public{
        require(!lock, "You cannot get Token this way!");
        _mint(msg.sender, 1);
        lock = true;
    }
    

}
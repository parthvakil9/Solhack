// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./ERCtoken.sol";
contract CTFNFT {
    mapping(address => uint) public credit;
    ERCtoken public token;
    NFT public nft;
    constructor(address _token, address _nft){
        nft = NFT(_nft);
        token = ERCtoken(_token);
        token.getToken();
    }
    
    function depositNFT() public{
        require(nft.ownerOf(1) == msg.sender, "You are not the owner");
        nft.transferFrom(msg.sender, address(this), 1);
        credit[msg.sender] = credit[msg.sender] + 1;
    } 
    function getLoan() public{
        require(credit[msg.sender]>=1, "Sorry, you dont have enough credit");
        token.transfer(msg.sender, 1);
        credit[msg.sender] -= 1;
    }
    function withdrawNFT() public{
        require(credit[msg.sender]>=1, "Sorry, either you used your credit or you never had any!");
        nft.safeTransferFrom(address(this), msg.sender, 1);
        unchecked{
        credit[msg.sender] -= 1;
        }
    }   

}
contract NFT is ERC721("Concordia-NFT", "CNFT"){
    bool public lock;
    function getNFT() public{
        require(!lock, "Sorry you cannot take more then 1 NFT");
        _mint(msg.sender,1);
        lock = true;
    }


}
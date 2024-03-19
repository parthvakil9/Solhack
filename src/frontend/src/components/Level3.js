import React, { useState, useEffect } from "react";
import Code from "./Code";
import addresses from "../Gamedata/contract-address.json"
import pkgWeb3 from "web3"
import artifacts from "../Gamedata/CTFNFT.json"
import nftabi from "../Gamedata/NFT.json"
import tokenabi from "../Gamedata/ERCToken.json"
import Button from "react-bootstrap/esm/Button";
import Flagabi from "../Gamedata/FlagGiver.json"
import Alert from 'react-bootstrap/Alert';

const ethers = require("ethers")



const h = `
// In order to pass this challange, try to have NFT with id 1 and 1 erc token at the same time
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
contract nft is ERC721("Concordia-NFT", "CNFT"){
    bool public lock;
    function getNFT() public{
        require(!lock, "Sorry you cannot take more then 1 NFT");
        _mint(msg.sender,1);
        lock = true;
    }


}
contract token is ERC20("C-Token", "CTK"){
    bool public lock;
    function getToken() public{
        require(!lock, "You cannot get Token this way!");
        _mint(msg.sender, 1);
        lock = true;
    }
    

}
`

export default function Level3(){
  const [flag, setFlag] = useState("");
  window.web3 = new pkgWeb3(window.ethereum)
  const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.greet("Welcome to third Level. You can use help() to get some methods")
  const ctfnft = new ethers.Contract(
  addresses.CTFNFT, // Replace with the deployed contract's address
  artifacts.abi,
  provider
  );
  const Flag = new ethers.Contract(
    addresses.FlagGiver, // Replace with the deployed contract's address
    Flagabi.abi,
    provider
    );
  const nft = new ethers.Contract(
    addresses.NFT, // Replace with the deployed contract's address
    nftabi.abi,
    provider
    );
    const token = new ethers.Contract(
        addresses.ERCToken, // Replace with the deployed contract's address
        tokenabi.abi,
        provider
        );
  window.contract = ctfnft
  window.nft = nft;
  window.token = token;
  async function checkSubmit(){
    try{
    const txData = Flag.interface.encodeFunctionData("CheckLevel3");
    const txResult = await provider.call({
      to: Flag.address,
      data: txData
    });
    
    
    
    const FL = ethers.utils.parseBytes32String(txResult)
    
    setFlag(FL)
}
catch(err){}
  }
    
    return(
        
        <div style={{ 
            backgroundImage: `url("/Home4.jpg")`,
          }}>
       <div className="container">
            <div className="row">
        <div className="col-auto"></div>
        <h1>Hey there, welcome to second level.
        <br /></h1>
        
        <h2>This is the address of your contract: <br></br></h2>
        <div style={{textAlign: "center"}}>{ctfnft.address}</div>
        {flag != "" && (<Alert variant="info">
              {flag}</Alert>)}
        <Code content={h} />
        <Button onClick={checkSubmit} variant="secondary">Submit</Button>{' '}
        </div>
        </div>

        </div>
    )
}
async function getBalance(provider){
    const balance = await provider.getBalance(addresses.DAO)
    console.log("the balance is:", balance)
    return balance;
}


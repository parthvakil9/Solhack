import React, { useState, useEffect } from "react";
import Code from "./Code";
import addresses from "../Gamedata/contract-address.json"
import pkgWeb3 from "web3"
import { useOutletContext } from "react-router-dom";
import artifacts from "../Gamedata/DAO.json"
import Button from "react-bootstrap/esm/Button";
import Flagabi from "../Gamedata/FlagGiver.json"
import Alert from 'react-bootstrap/Alert';


const ethers = require("ethers")


const h = `
// The base one, drain all the ethers from the smart contract.
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
`

export default function Level2(){
  const [flag, setFlag] = useState("");
  window.web3 = new pkgWeb3(window.ethereum)
  const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.greet("Welcome to Second Level. You can use help() to get some methods")
  const dao = new ethers.Contract(
  addresses.DAO, // Replace with the deployed contract's address
  artifacts.abi,
  provider
  );
  const Flag = new ethers.Contract(
    addresses.FlagGiver, // Replace with the deployed contract's address
    Flagabi.abi,
    provider
    );
  window.contract = dao
  async function checkSubmit(){
    const txData = Flag.interface.encodeFunctionData("CheckLevel2");
    const txResult = await provider.call({
      to: Flag.address,
      data: txData
    });
    console.log(txResult)
    
    const FL = ethers.utils.parseBytes32String(txResult)
    
    setFlag(FL)
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
        <div style={{textAlign: "center"}}>{dao.address}</div>
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


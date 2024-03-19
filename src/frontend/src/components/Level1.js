import React, { useState, useEffect } from "react";
import Code from "./Code";
import addresses from "../Gamedata/contract-address.json"
import pkgWeb3 from "web3"
import { useOutletContext } from "react-router-dom";
import artifacts from "../Gamedata/Thedoor.json"
import Button from "react-bootstrap/esm/Button";
import Alert from 'react-bootstrap/Alert';
import Flagabi from "../Gamedata/FlagGiver.json"


const ethers = require("ethers")




const h = `
// This one is simple. simply open the lock
// Dont hesitate to use console!
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Thedoor{
  bool public locked;
  bytes32 private password;

  constructor(bytes32 _password) {
    locked = true;
    password = _password;
  }

  function unlock(bytes32 _password) public {
    if (password == _password) {
      locked = false;
    }
  }
}
`

export default function Level1(){
  const [flag, setFlag] = useState("");

  window.web3 = new pkgWeb3(window.ethereum)
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  console.greet("Welcome to First Level. You can use help() to get some methods")
  const thedoor = new ethers.Contract(
  addresses.Thedoor, // Replace with the deployed contract's address
  artifacts.abi,
  provider
  );
  const Flag = new ethers.Contract(
    addresses.FlagGiver, // Replace with the deployed contract's address
    Flagabi.abi,
    provider
    );
  window.contract = thedoor

  async function checkSubmit(){
    
    const txData = Flag.interface.encodeFunctionData("CheckLevel1");
    const txResult = await provider.call({
      to: Flag.address,
      data: txData
    });
    
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
    <div style={{textAlign: "center"}}>{thedoor.address}</div>
    
    {flag != "" && (<Alert variant="info">
              {flag}</Alert>)}
    <Code content={h} />
    <Button onClick={checkSubmit} variant="secondary">Submit</Button>{' '}
    </div>
    </div>

    </div>
    )
}


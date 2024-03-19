import React, {useState} from "react";
import contractAddress from "../Gamedata/contract-address.json";
import { Outlet, useLocation } from "react-router-dom";
import addresses from "../Gamedata/contract-address.json"
import "./abcd"

export function Levels(){
    let [isAddress, setIsAddress] = useState(false);
    let [address, setAddress] = useState("");
    console.log("this is the address:",address)
 


    return(
        <>
        <h1>
            Hey there, Glad you accepted the challange. Your address is : 
        </h1>
        
            <ul>
                <li><button>LockedDoor</button></li>
                <li>{isAddress ? address : "Sorry, you do not have an address yet"}</li>
                {!isAddress && <><button onClick = {() => {setAddress(addresses.Player); setIsAddress(true)}}> getAddress</button></>}
                
            </ul>
        <div id="main-levels">
        <h1>This is where we will load our content</h1>
        <br /><hr />
        <Outlet />
        </div>
            
            
        </>
    )
}
// function saveFile(deployer, player){}
//     const path = require('path')
//     const Direc = path.relative("/src/components/", "/src/Gamedata/")
//     fs.writeFileSync(path.join(Direc, "Address.json"), 
//     JSON.stringify({ Deployer: deployer, PlayerAddress: player}, undefined, 2));

// }
// async function getAddress(){
//     const [deployer, player] = await ethers.getSigners()
//     const deployerAdd = await deployer.getAddress()
//     const playerAdd = await player.getAddress()
//     saveFile(deployerAdd, playerAdd)
// }

// function Level1(){
    
//     return(
//         <>
//         <h1>
//             The door
//         </h1>
//         <p>
//             This is the first Challange. The contract has a lock which is to be turned off. The value of the key is private.

//         </p>
//         <br />
//         <p>
//         This is the code .......
//         The contract address is {levl1.address}
//         Use your console to interact with the blockchain!
//         </p>
//         </>
//     )
// }

import React from "react";

import { NetworkErrorMessage } from "./NetworkErrorMessage";

export function ConnectWallet({ connectWallet, networkError, dismiss }) {
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-12 text-center">
          {/* Wallet network should be set to Localhost:8545. */}
          {networkError && (
            <NetworkErrorMessage 
              message={networkError} 
              dismiss={dismiss} 
            />
          )}
        </div>
        <div className="col-6 p-4 text-center">
          <p>Please connect to your wallet.</p>
          <br />
          <p> You need to configure your Metamsk wallet to connect to the local blockchain network. The steps are given bellow:</p>
          <ul>
            <li>Click on 3 dots on the Right top corner and click on Expand View</li>
            <li>Again click on 3 dots and open settings.</li>
            <li>Click on networks</li>
            <li>Click on Add Network {">"} Add a network manually</li>
            <li>Enter the following details:
              <ol>
                <li>Network Name: CTF</li>
                <li>New RPC URL: http://127.0.0.1:8545/</li>
                <li>Chain Id: 31337</li>
                <li>Currency Symbol: GO </li>
                <li>Block explorer URL: EMPTY</li>
              </ol>
              </li>
            <li> Click on save and swith to this new network {"("}from the top left corner in metamask {")"}</li>
            <li>After configuring your metamask, click on connect wallet.</li>
            
          </ul>
          <button
            className="btn btn-warning"
            type="button"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
}

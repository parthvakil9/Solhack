import React from "react";
import { ethers } from "ethers";
import { useOutletContext } from "react-router-dom";
import contractAddress from "../Gamedata/contract-address.json";


export function Faucet() {
  const provider =  useOutletContext()
  return (
    <div>
      <h4>Faucet</h4>
      <form
        onSubmit={(event) => {
          // This function just calls the transferTokens callback with the
          // form's data.
          event.preventDefault();

          const formData = new FormData(event.target);
          const amount = formData.get("amount");

          if (amount) {
            _transferTokens(amount, provider);
          }
        }}
      >
        <div className="form-group">
          <label>Amount of </label>
          <input
            className="form-control"
            type="number"
            step="1"
            name="amount"
            placeholder="1"
            required
          />
        </div>
        
        <div className="form-group">
          <input className="btn btn-primary" type="submit" value="Transfer" />
        </div>
      </form>
    </div>
  );
}

async function _transferTokens(amount, provider) {
    // Sending a transaction is a complex operation:
    //   - The user can reject it
    //   - It can fail before reaching the ethereum network (i.e. if the user
    //     doesn't have ETH for paying for the tx's gas)
    //   - It has to be mined, so it isn't immediately confirmed.
    //     Note that some testing networks, like Hardhat Network, do mine
    //     transactions immediately, but your dapp should be prepared for
    //     other networks.
    //   - It can fail once mined.
    //
    // This method handles all of those things, so keep reading to learn how to
    // do it.

    
      // If a transaction fails, we save that error in the component's state.
      // We only save one such error, so before sending a second transaction, we
      // clear it.
    
      // We send the transaction, and save its hash in the Dapp's state. This
      // way we can indicate that we are waiting for it to be mined.
      const signer = provider.getSigner(1)
      const add = window.ethereum.selectedAddress
      console.log("this is ", add)
      signer.sendTransaction({
        to: add,
        value: ethers.utils.parseEther(amount)
    })

  }

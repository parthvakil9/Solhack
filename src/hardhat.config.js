require("@nomicfoundation/hardhat-toolbox");
//require("@openzeppelin/contracts")

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/faucet");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks:{
    hardhat:{
      chainId: 1337
    }
  }
};

// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.
const {ethers} = require("hardhat")
const { artifacts } = require("hardhat");
const path = require("path");

async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  // ethers is available in the global scope
  const [deployer, player] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy();
  await token.deployed();
  const daoEth = ethers.utils.parseEther("4.0")
  const Thedoor = await ethers.getContractFactory("Thedoor")
  const thedoor = await Thedoor.deploy(ethers.utils.formatBytes32String("PAsssword"))
  await thedoor.deployed()

  const dao = await ethers.getContractFactory("DAO")
  const DAO = await dao.deploy()
  await DAO.deployed()
  await token.Deposit(DAO.address,{value:daoEth})
  // const addr = DAO.address
  // console.log("this is the adress:", addr)

  const ERCtoken = await ethers.getContractFactory("ERCtoken")
  const erctoken = await ERCtoken.deploy()
  await erctoken.deployed()

  const NFT = await ethers.getContractFactory("NFT")
  const nft = await NFT.deploy()
  await nft.deployed()
  
  const ctfnft = await ethers.getContractFactory("CTFNFT")
  const CTFNFT = await ctfnft.deploy(erctoken.address, nft.address)
  await CTFNFT.deployed();


  const flaggiver = await ethers.getContractFactory("FlagGiver")
  const FlagGiver = await flaggiver.deploy(CTFNFT.address, thedoor.address, DAO.address, erctoken.address, nft.address, ethers.utils.formatBytes32String("ATHACKCTF{n07_pr1v473}"), ethers.utils.formatBytes32String("ATHACKCTF{c4ll1ng_s4m3}"), ethers.utils.formatBytes32String("ATHACKCTF{b3_r1C1-1}"))
  await FlagGiver.deployed();
  console.log("Token address:", erctoken.address);
  console.log("NFT address:", CTFNFT.address);
  console.log("DAO address:", DAO.address);
  const address = await deployer.getAddress()
  const Playadd = await player.getAddress()


  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(nft, erctoken, CTFNFT, token,thedoor,DAO ,address, Playadd, FlagGiver);
}

function saveFrontendFiles(nft, erctoken, ctfnft, token, thedoor,dao, deployer, player, FlagGiver) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "..", "frontend", "src", "Gamedata");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify({ FlagGiver: FlagGiver.address, ERCToken: erctoken.address, NFT: nft.address, CTFNFT: ctfnft.address, Token: token.address, Thedoor: thedoor.address, DAO: dao.address, Deployer: deployer, Player: player}, undefined, 2)
  );

  const TokenArtifact = artifacts.readArtifactSync("Token");
  const Thedoorabi = artifacts.readArtifactSync("Thedoor")
  const DAOabi = artifacts.readArtifactSync("DAO")
  const erctokenabi = artifacts.readArtifactSync("ERCtoken")
  const nftabi = artifacts.readArtifactSync("NFT")
  const CTFNFTabi = artifacts.readArtifactSync("CTFNFT")
  const FlagGiverabi = artifacts.readArtifactSync("FlagGiver")

  fs.writeFileSync(
    path.join(contractsDir, "Token.json"),
    JSON.stringify(TokenArtifact, null, 3)
  );
  fs.writeFileSync(
    path.join(contractsDir, "DAO.json"),
    JSON.stringify(DAOabi, null, 3)
  );
  fs.writeFileSync(
    path.join(contractsDir, "Thedoor.json"),
    JSON.stringify(Thedoorabi, null, 3)
  );
  fs.writeFileSync(
    path.join(contractsDir, "CTFNFT.json"),
    JSON.stringify(CTFNFTabi, null, 3)
  );
  fs.writeFileSync(
    path.join(contractsDir, "NFT.json"),
    JSON.stringify(nftabi, null, 3)
  );
  fs.writeFileSync(
    path.join(contractsDir, "ERCToken.json"),
    JSON.stringify(erctokenabi, null, 3)
  );
  fs.writeFileSync(
    path.join(contractsDir, "FlagGiver.json"),
    JSON.stringify(FlagGiverabi, null, 3)
  );
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

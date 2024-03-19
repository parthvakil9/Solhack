import React from "react";

// We'll use ethers to interact with the Ethereum network and our contract
//import "./abcd"

// We import the contract's artifacts and address here, as we are going to be
// using them with ethers
import TokenArtifact from "../Gamedata/Token.json";
import Thedoorabi from "../Gamedata/Thedoor.json";
import DAOabi from "../Gamedata/DAO.json"
import contractAddress from "../Gamedata/contract-address.json";
import { Outlet, Link, useOutletContext } from "react-router-dom";


// All the logic of this dapp is contained in the Dapp component.
// These other components are just presentational ones: they don't have any
// logic. They just render HTML.
import { NoWalletDetected } from "./NoWalletDetected";
import { ConnectWallet } from "./ConnectWallet";
import { Loading } from "./Loading";
import Level1 from "./Level1";
import { Transfer } from "./Transfer";
import { TransactionErrorMessage } from "./TransactionErrorMessage";
import { WaitingForTransactionMessage } from "./WaitingForTransactionMessage";
import { NoTokensMessage } from "./NoTokensMessage";
import { Levels } from "./Levels";
import "bootstrap/dist/css/bootstrap.css";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Alert from 'react-bootstrap/Alert';


const ethers = require("ethers")
const web3 = require("web3")

// This is the default id used by the Hardhat Network
const HARDHAT_NETWORK_ID = '1337';

// This is an error code that indicates that the user canceled a transaction
const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

// This component is in charge of doing these things:
//   1. It connects to the user's wallet
//   2. Initializes ethers and the Token contract
//   3. Polls the user balance to keep it updated.
//   4. Transfers tokens by sending transactions
//   5. Renders the whole application
//
// Note that (3) and (4) are specific of this sample application, but they show
// you how to keep your Dapp and contract's state in sync,  and how to send a
// transaction.
export class Dapp extends React.Component {
  constructor(props) {
    super(props);

    // We store multiple things in Dapp's state.
    // You don't need to follow this pattern, but it's an useful example.
    this.initialState = {
      // The info of the token (i.e. It's Name and symbol)
      chainId: undefined,
      // The user's address and balance
      selectedAddress: undefined,
      balance: undefined,
      // The ID about transactions being sent, and any possible error with them
      txBeingSent: undefined,
      transactionError: undefined,
      networkError: undefined,
    };

    this.state = this.initialState;
  }
  

  render() {
    // Ethereum wallets inject the window.ethereum object. If it hasn't been
    // injected, we instruct the user to install a wallet.
    if (window.ethereum === undefined) {
      return <NoWalletDetected />;
    }


    // The next thing we need to do, is to ask the user to connect their wallet.
    // When the wallet gets connected, we are going to save the users's address
    // in the component's state. So, if it hasn't been saved yet, we have
    // to show the ConnectWallet component.
    //
  
    // console.log("Id",window.ethereum.networkVersion)
    // if (window.ethereum.networkVersion == "1337" && !this.state.balance && !this.state.selectedAddress){
    //   this._connectWallet();
    // }
    // if (window.ethereum.networkVersion != "1337") {
    //   return (
    //     <ConnectWallet 
    //       connectWallet={() => this._connectWallet()} 
    //       networkError={this.state.networkError}
    //       dismiss={() => this._dismissNetworkError()}
    //     />
    //   );
    // }
    // if(this.state.balance){
    //   this._stopPollingData();
    // }
    

    // If the token data or the user's balance hasn't loaded yet, we show
    // a loading component.

    // If everything is loaded, we render the application.
    return (
      <div style={{ 
        backgroundImage: `/Home-4.jpg` 
      }}><Container>
        <Row>
        
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Row>
            <Col>CTFEth</Col>
            <Col md="auto">Your address is: {this.state.selectedAddress}</Col>
            <Col>{(this.state.balance/1000000000000000000).toString()} CETH</Col>
            <Col><Nav>
          <Nav.Item>
            <Nav.Link href="/faucet">Faucet</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/Troubleshooting">Troubleshooting</Nav.Link>
          </Nav.Item>
          <NavDropdown title="Levels" id="nav-dropdown">
        <NavDropdown.Item href="/Level1">Level1</NavDropdown.Item>
        <NavDropdown.Item href="/Level2">Level2</NavDropdown.Item>
        <NavDropdown.Item href="/Level3">Level3</NavDropdown.Item>
      </NavDropdown>
        </Nav></Col>
          </Row>
          
      </Container>
        
        </Navbar>
        </Row>
        {!this.state.selectedAddress && ( <div class="container d-flex justify-content-center align-items-center">
    <button class="btn btn-success" onClick={()=>this._connectWallet()}>Click me first!</button></div>)}
        
        
        {this.state.balance==0 && (
              <Alert variant="info">
              You do not have any Tokens. Get some CTFEthers From the Faucet: <Link to={`faucet`}>Faucet</Link></Alert>
            )}
            
            <Row>
            {this.state.txBeingSent && (
              <WaitingForTransactionMessage txHash={this.state.txBeingSent} />
            )}

            {/* 
              Sending a transaction can fail in multiple ways. 
              If that happened, we show a message here.
            */}
            {this.state.transactionError && (
              <TransactionErrorMessage
                message={this._getRpcErrorMessage(this.state.transactionError)}
                dismiss={() => this._dismissTransactionError()}
              />
              
            )}
            </Row>
            
            </Container>
            
            
            
           
            <Outlet context={this._provider} />
            
            
            </div>
            );
          
            
            
            
  }


  
  componentWillUnmount() {
    // We poll the user's balance, so we have to stop doing that when Dapp
    // gets unmounted
    this._stopPollingData();
  }

  async _connectWallet() {
    try{
      
    // This method is run when the user clicks the Connect. It connects the
    // dapp to the user's wallet, and initializes it.

    // To connect to the user's wallet, we have to run this method.
    // It returns a promise that will resolve to the user's address.
    const [selectedAddress] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    
    

    // Once we have the address, we can initialize the application.

    // First we check the network
    this._checkNetwork();

    this._initialize(selectedAddress);

    // We reinitialize it whenever the user changes their account.
    window.ethereum.on("accountsChanged", ([newAddress]) => {
      this._stopPollingData();
      // `accountsChanged` event can be triggered with an undefined newAddress.
      // This happens when the user removes the Dapp from the "Connected
      // list of sites allowed access to your addresses" (Metamask > Settings > Connections)
      // To avoid errors, we reset the dapp state 
      if (newAddress === undefined) {
        return this._resetState();
      }
      
      this._initialize(contractAddress.Player);
    });
  }
  catch(error){

  }
  }

  _initialize(userAddress) {
    // This method initializes the dapp

    // We first store the user's address in the component's state
    this.setState({
      selectedAddress: userAddress,
    });

    // Then, we initialize ethers, fetch the token's data, and start polling
    // for the user's balance.

    // Fetching the token data and the user's balance are specific to this
    // sample project, but you can reuse the same initialization pattern.
    this._initializeEthers();
    this._startPollingData();
    //this._stopPollingData();
  }

  async _initializeEthers() {
    // We first initialize ethers by creating a provider using window.ethereum
    //this._provider = new ethers.providers.Web3Provider(window.ethereum);
    //console.log("The signer is:", this._provider.getSigner(0))
    const url = 'http://localhost:8545/'
    try{
      this._provider = new ethers.providers.JsonRpcProvider(url);
    }
    catch(error){

    }
    // Then, we initialize the contract using that provider and the token's
    // artifact. You can do this same thing with your contracts.
    
    
  }
  
  // The next two methods are needed to start and stop polling data. While
  // the data being polled here is specific to this example, you can use this
  // pattern to read any data from your contracts.
  //
  // Note that if you don't need it to update in near real time, you probably
  // don't need to poll it. If that's the case, you can just fetch it when you
  // initialize the app, as we do with the token data.
  async _startPollingData() {
    this._pollDataInterval = setInterval(() => this._updateBalance(), 1000);

    // We run it once immediately so we don't have to wait for it
    await this._updateBalance();
   
  }

  _stopPollingData() {
    clearInterval(this._pollDataInterval);
    this._pollDataInterval = undefined;
  }

  // The next two methods just read from the contract and store the results
  // in the component state.
  async _getTokenData() {
    const name = await this._token.name();
    const symbol = await this._token.symbol();

    this.setState({ tokenData: { name, symbol } });
  }

  async _updateBalance() {
  
    
  try{
    const balance = await this._provider.getBalance(this.state.selectedAddress)
    this.setState({ balance });
  }
    

  catch(error){}
  
  

    // console.log("This is second:",sdsd)
    
  }

  // This method sends an ethereum transaction to transfer tokens.
  // While this action is specific to this application, it illustrates how to
  // send a transaction.
  
  // This method just clears part of the state.
 
  // This is an utility method that turns an RPC error into a human readable
  // message.
 

  // This method resets the state
  _resetState() {
    this.setState(this.initialState);
  }

  async _switchChain() {
    const chainIdHex = `0x539`
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainIdHex }],
    });
    await this._initialize(this.state.selectedAddress);
  }

  // This method checks if the selected network is Localhost:8545
  _checkNetwork() {
    if (window.ethereum.networkVersion !== HARDHAT_NETWORK_ID) {
      this._switchChain();
    }
  }
}

function LEvel1(){
  return <Level1 />
}

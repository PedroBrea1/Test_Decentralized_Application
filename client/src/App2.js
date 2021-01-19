import React, { Component } from "react";
import Pay from "./contracts/Pay.json";
import EtherTransferTo from "./contracts/EtherTransferTo.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { storageValue: "", storageValue2:"", web3: null, accounts: null, contract: null, contract2: null, newValue:"" , newValue2:""};

  componentDidMount = async () => {
    try {

      this.handleChange2 = this.handleChange2.bind(this);
      this.handleTransaction = this.handleTransaction.bind(this);
      this.handleChange3 = this.handleChange3.bind(this);
      this.handleTransaction2 = this.handleTransaction2.bind(this);

      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      //web3 default account (the one the contract use to pay the gas)
     
      //web3.eth.personal.unlockAccount(web3.eth.defaultAccount);

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Pay.networks[networkId];
      const instance = new web3.eth.Contract(
        Pay.abi,
        deployedNetwork.address,
       
      );
     

      // Get the second contract instance.
      const networkId2 = await web3.eth.net.getId();
      const deployedNetwork2 = EtherTransferTo.networks[networkId2];
      const instance2 = new web3.eth.Contract(
        EtherTransferTo.abi,
        deployedNetwork2.address,
       
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance, contract2: instance2 }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  //2 functions to change the data from a smart contract
  handleChange2(event){
    this.setState({newValue: event.target.value});
  }

  async handleTransaction(event){
    event.preventDefault();

    const { accounts, contract } = this.state;
    await contract.methods.sendEther().send({ 
      from: accounts[0],
      value: '100000'
    });

  }

  handleChange3(event){
    this.setState({newValue2: event.target.value});
  }

  async handleTransaction2(event){
    event.preventDefault();
    
    const { contract, contract2 } = this.state;
    await contract.methods.sendEther2().send({ 
      from: contract.options.address,
      to: contract2.options.address
    });

  } 

  

  runExample = async () => {
    const { contract, contract2 } = this.state;

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.balanceOf().call();

    // Update state with the result.
    this.setState({ storageValue: response });

     // Get the value from the contract to prove it worked.
     const response2 = await contract2.methods.balanceOf2().call();

     // Update state with the result.
     this.setState({ storageValue2: response2 });

  };

  render() {
    
    return (
      <div className="App">
        <h1>Welcome to this dApp2</h1>
        <div>Pedro likes {this.state.storageValue}</div>
        <form onSubmit = {this.handleTransaction}>
          <input type="text" value = {this.state.newValue} onChange = {this.handleChange2.bind(this)}/>
          <input type = "submit" value = "Submit"/>
        </form>
        <h1>Welcome to this dApp3</h1>
        <div>Pedro likes {this.state.storageValue2}</div>
        <form onSubmit = {this.handleTransaction2}>
          <input type="text" value = {this.state.newValue2} onChange = {this.handleChange3.bind(this)}/>
          <input type = "submit" value = "Submit"/>
        </form>
      </div>
      
    );
  
  }

}

export default App;

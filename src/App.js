import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import web3 from "./Web3";
import lottery from "./Lottery";

class App extends Component {
  state = {
    manager: "",
    players: [],
    balance: "",
    value: "",
    message: "",
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    console.log(manager);
    //  console.log(random);
    console.log(players);
    this.setState({ manager, players, balance });
  }
  onSubmit = async (event) => {
    // writting fonction like this allow to have access to this without having to bind
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: "Waiting on transaction success...  " });
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether"),
    });
    this.setState({ message: "Transaction performed successfully " });
  };
  onClick = async (event) => {
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: "Waiting on transaction success...  " });

    lottery.methods.pickWinner().send({
      from: accounts[0],
    });
    this.setState({ message: "a winner has been picked!  " });
  };

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {this.state.manager}</p>
        <p>
          This contract has the following players: {this.state.players.length}{" "}
          are competing to win {web3.utils.fromWei(this.state.balance, "ether")}
        </p>
        <hr />
        <form onSubmit={this.onSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether</label>
            <input
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            ></input>
            <button>Enter</button>
          </div>
        </form>
        <hr />
        <p>Time to pick a winner?</p>
        <button onClick={this.onClick}>Pick a Winner!</button>
        <hr />
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default App;

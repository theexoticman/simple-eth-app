const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const { interface, bytecode } = require("./compile_lottery");
seed = ""
infuraApi = ""
const provider = new HDWalletProvider(
  seed,
  infuraApi
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  const result = await new web3.eth.Contract(interface)
    .deploy({ data: bytecode })
    .send({ gas: "1000000", from: accounts[0] });
  
  console.log("Constract deployed to: ", result.options.address);
};
deploy();

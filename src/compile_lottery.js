const path = require("path");
const fs = require("fs");
const solc = require("solc");
//console.log("version: "+solc.version);
//const { SSL_OP_CIPHER_SERVER_PREFERENCE } = require('node:constants');
// we don't require the contract directly because it would execute the whole file
let filename = "lottery.sol";
const lotteryContractPath = path.resolve(__dirname, "contracts", "lottery.sol");
const source = fs.readFileSync(lotteryContractPath, "utf8");

var input = {
  language: "Solidity",
  sources: {
    file: {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));

const interface = output.contracts.file.Lottery.abi;
const bytecode = output.contracts.file.Lottery.evm.bytecode.object;
module.exports = { interface, bytecode };

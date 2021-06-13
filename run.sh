#!/bin/bash

# compile the lottery contract
node compile.js
# deploy the contract
node deploy.js
# For now, manually update the smart contract abi

#For now, manually update the smart cotnract address
# start the react app
npm start
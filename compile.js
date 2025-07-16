const path = require("path");
const fs   = require("fs");
const solc = require("solc");

const inboxPath = path.resolve(__dirname, "contracts", "Inbox.sol");
const source    = fs.readFileSync(inboxPath, "utf8");

const input = {
  language: "Solidity",
  sources: {
    "Inbox.sol": {
      content: source,
    },
  },
  settings: {
    // EVM sürümünü Ganache’ın desteklediği bir hardfork’a sabitleyelim
    evmVersion: "london",     // veya "istanbul"
    outputSelection: {
      "*": {
        "*": ["abi", "evm.bytecode"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
const contract = output.contracts["Inbox.sol"].Inbox;

if (!contract) {
  console.error("Derleme başarısız!", JSON.stringify(output, null, 2));
  throw new Error("Sözleşme derlenemedi.");
}

module.exports = contract;

const HDWalletProvider = require('truffle-hdwallet-provider');
const privateKey = "adc866c00d85769f10fc14d0b9689483456466a318c165646c4793d009a5cf2c";
const endpointUrl = "https://kovan.infura.io/v3/3e8cfce0ec4f4ed19d94c6cc8e008ae2";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "5777",
    },
    kovan: {
      provider: function() {
        return new HDWalletProvider(
          //private keys array
          [privateKey],
          //url to ethereum node
          endpointUrl
        )
      },
      gas: 5000000,
      gasPrice: 25000000000,
      network_id: 42
    }
  }
}
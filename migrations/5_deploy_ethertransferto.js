const hello = artifacts.require('./EtherTransferTo');

module.exports = function(deployer){
    deployer.deploy(hello);
};
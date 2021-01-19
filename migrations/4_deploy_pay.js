const hello = artifacts.require('./Pay');

module.exports = function(deployer){
    deployer.deploy(hello);
};
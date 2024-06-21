const GreenCoin = artifacts.require("GreenCoin");

// module.exports = function (deployer) {
//   const initialSupply = 1000000000;
//   deployer.deploy(GreenCoin, initialSupply);
// };
module.exports = async function (deployer, network, accounts) {
  const initialSupply = 0;
  await deployer.deploy(GreenCoin, initialSupply);
};

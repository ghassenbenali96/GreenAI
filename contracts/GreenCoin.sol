// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


// contract GreenCoin is ERC20 {
//     constructor(uint256 initialSupply) ERC20("GreenCoin", "GRC") {
//         _mint(msg.sender, initialSupply);
//     }
// }



contract GreenCoin is ERC20 {
    constructor(uint256 initialSupply) ERC20("GreenCoin", "GRC") {
        _mint(msg.sender, initialSupply);
    }

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
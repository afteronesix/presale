// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract X804Token is ERC20, Ownable {
    uint256 public constant INITIAL_SUPPLY = 100000000 * 10**18;

    constructor() ERC20("X804 Token", "X804") Ownable(msg.sender) {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}
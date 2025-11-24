// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract AirdropBox is ReentrancyGuard, Ownable {

    IERC20 public immutable token;
    uint256 public constant COOLDOWN = 1 days;
    uint256 public constant MAX_REWARD = 20 * 1e18;
    uint256 public constant MIN_REWARD = 1 * 1e18;

    mapping(address => uint256) public lastOpened;

    event BoxOpened(address indexed user, uint256 reward);

    constructor(address _token) Ownable(msg.sender) {
        token = IERC20(_token);
    }

    function openBox() external nonReentrant {
        require(
            block.timestamp >= lastOpened[msg.sender] + COOLDOWN,
            "Cooldown"
        );

        uint256 random = uint256(
            keccak256(
                abi.encodePacked(
                    msg.sender,
                    block.timestamp,
                    block.prevrandao,
                    address(this)
                )
            )
        );

        uint256 reward = (random % (MAX_REWARD - MIN_REWARD + 1)) + MIN_REWARD;

        lastOpened[msg.sender] = block.timestamp;

        token.transfer(msg.sender, reward);

        emit BoxOpened(msg.sender, reward);
    }

    function withdrawERC20(address erc20, uint256 amount) external onlyOwner {
        IERC20(erc20).transfer(msg.sender, amount);
    }
}

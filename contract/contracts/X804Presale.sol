// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract X804Presale is Ownable {
    uint256 public constant RATE = 150000;
    uint256 public constant MIN_PURCHASE = 1e16;
    uint256 public constant MAX_PURCHASE = 1e18;
    uint256 public constant CAP = 200 ether; 

    IERC20 public X804Token;
    uint256 public raisedAmount;
    
    mapping(address => uint256) public contributions;

    event TokensPurchased(address indexed purchaser, uint256 ethAmount, uint256 tokenAmount);

    constructor(address _tokenAddress) Ownable(msg.sender) {
        X804Token = IERC20(_tokenAddress);
    }
    
    receive() external payable {
        buyTokens();
    }
    fallback() external payable {
        buyTokens();
    }

    function buyTokens() public payable {
        require(msg.value > 0, "Amount must be greater than 0");
        require(msg.value >= MIN_PURCHASE, "Must meet minimum purchase (0.01 ETH)");
        require(msg.value <= MAX_PURCHASE, "Cannot exceed maximum purchase (1 ETH)");

        require(raisedAmount + msg.value <= CAP, "Presale cap reached");
        
        uint256 tokensToMint = msg.value * RATE;
        
        require(X804Token.balanceOf(address(this)) >= tokensToMint, "Insufficient token balance in contract");

        raisedAmount += msg.value;
        contributions[msg.sender] += msg.value;

        bool success = X804Token.transfer(msg.sender, tokensToMint);
        require(success, "Token transfer failed");

        emit TokensPurchased(msg.sender, msg.value, tokensToMint);
    }

    function withdrawETH() public onlyOwner {
        require(address(this).balance > 0, "No ETH to withdraw");
        
        (bool success, ) = payable(owner()).call{value: address(this).balance}("");
        require(success, "ETH withdrawal failed");
    }

    function withdrawUnsoldTokens() public onlyOwner {
        require(raisedAmount >= CAP, "Presale cap not yet reached or closed");

        uint256 unsoldTokens = X804Token.balanceOf(address(this));
        require(unsoldTokens > 0, "No unsold tokens remaining");
        
        bool success = X804Token.transfer(owner(), unsoldTokens);
        require(success, "Unsold token withdrawal failed");
    }
}
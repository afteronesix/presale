// deploy.js

const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const initialSupply = 30000000;

  console.log(`\nDeploying contracts with the account: ${deployer.address}`);
  console.log(`Account balance: ${hre.ethers.formatEther(await hre.ethers.provider.getBalance(deployer.address))} ETH`);
  console.log("----------------------------------------");


  const X804Token = await hre.ethers.getContractFactory("X804Token");
  const x804Token = await X804Token.deploy();

  await x804Token.waitForDeployment();
  const tokenAddress = await x804Token.getAddress();

  console.log(`✅ X804Token deployed to: ${tokenAddress}`);


 
  const X804Presale = await hre.ethers.getContractFactory("X804Presale");
  const x804Presale = await X804Presale.deploy(tokenAddress);

  await x804Presale.waitForDeployment();
  const presaleAddress = await x804Presale.getAddress();

  console.log(`✅ X804Presale deployed to: ${presaleAddress}`);
  console.log("----------------------------------------");


  
  console.log(`\nStarting token transfer to Presale Contract...`);
 
  const amountToTransfer = hre.ethers.parseUnits(initialSupply.toString(), 18);
  
 
  const tx = await x804Token.transfer(presaleAddress, amountToTransfer);
  await tx.wait(); 
  
  console.log(`✅ ${initialSupply} X804 (30%) transferred to Presale Contract at: ${presaleAddress}`);
  
  
  const presaleBalance = await x804Token.balanceOf(presaleAddress);
  console.log(`Current X804 balance in Presale Contract: ${hre.ethers.formatUnits(presaleBalance, 18)} X804`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
const { ethers } = require("hardhat");

async function main() {
  const TOKEN = "0xc84932efcBeEdbcf5B25F41461DE3F2b7DB8f5Eb";

  console.log("Deploying AirdropBox contract...");

  const AirdropBox = await ethers.getContractFactory("AirdropBox");
  const contract = await AirdropBox.deploy(TOKEN);

  await contract.waitForDeployment();

  console.log("AirdropBox deployed at:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

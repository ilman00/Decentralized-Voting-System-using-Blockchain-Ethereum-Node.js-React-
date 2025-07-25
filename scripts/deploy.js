const hre = require("hardhat");
const keccak256 = require("keccak256");

async function main() {
  const hashedSuperAdminCNIC = "0x" + keccak256("3520212345678").toString("hex");

  const AdminRegistry = await hre.ethers.getContractFactory("AdminRegistry");
  const registry = await AdminRegistry.deploy(hashedSuperAdminCNIC);

  await registry.deployed();

  console.log("AdminRegistry deployed to:", registry.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

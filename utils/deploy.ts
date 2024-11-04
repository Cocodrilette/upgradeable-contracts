import { ethers, upgrades } from "hardhat";

export async function deployProxy({
  name,
  args,
}: {
  name: string;
  args: any[];
}) {
  const Contract = await ethers.getContractFactory(name);
  const contract = await upgrades.deployProxy(Contract, args);
  await contract.waitForDeployment();

  const tx = contract.deploymentTransaction();

  logDeployment({
    address: contract.target as string,
    name,
    args,
    hash: (tx?.hash as string) || "0x0",
    deployer: (tx?.from as string) || "0x0",
  });

  return contract;
}

export function logDeployment({
  address,
  name,
  args,
  hash,
  deployer,
}: {
  address: string;
  name: string;
  args: any[];
  hash: string;
  deployer: string;
}) {
  console.log("\n🚀 Contract Deployed");
  console.log("📦 Name:        ", name);
  console.log("📄 Address:     ", address);
  console.log("🔗 Transaction: ", hash);
  console.log("👷 Deployer:    ", deployer);
  console.log("🎯 Args:        ", args);
  console.log("\n");
}

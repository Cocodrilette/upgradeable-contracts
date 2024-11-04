import { ethers, network, upgrades } from "hardhat";
import { logDeployment, saveDeploymentToReport } from "./report";

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

  const reportArgs = {
    address: contract.target as string,
    name,
    args,
    hash: (tx?.hash as string) || "0x0",
    deployer: (tx?.from as string) || "0x0",
  };

  logDeployment(reportArgs);
  saveDeploymentToReport({
    ...reportArgs,
    network: network.name,
  });

  return contract;
}

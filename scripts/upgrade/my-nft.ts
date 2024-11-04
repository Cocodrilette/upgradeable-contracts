import { ethers, upgrades } from "hardhat";
import { deployContract } from "../../utils/deploy";

const CONTRACT_NAME = "MyNFTV2";
const CONTRACT_ADDRESS = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318";

async function main() {
  const proxy = await ethers.getContractAt(CONTRACT_NAME, CONTRACT_ADDRESS);
  const contract = await deployContract({
    name: CONTRACT_NAME,
    args: [],
    implementationOf: CONTRACT_ADDRESS,
  });

  await (contract as any).initialize(await proxy.owner());
  await proxy.upgradeToAndCall(contract.target, "0x");

  console.log("MyNFT upgraded");
}
  
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

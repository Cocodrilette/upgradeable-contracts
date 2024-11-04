import { ethers, upgrades } from "hardhat";

const CONTRACT_NAME = "MyNFTV2";
const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

async function main() {
  const initialOwner = (await ethers.getSigners())[0];

  const Contract = await ethers.getContractFactory(CONTRACT_NAME);
  const contract = await upgrades.upgradeProxy(CONTRACT_ADDRESS, Contract, {
    kind: "uups",
    redeployImplementation: "always",
    call: {
      fn: "initialize",
      args: [initialOwner.address],
    },
  });

  await contract.waitForDeployment();
  console.log("Contract upgraded at:", contract.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

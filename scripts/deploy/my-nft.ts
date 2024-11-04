import { ethers } from "hardhat";
import { deployProxy } from "../../utils/deploy";

const CONTRACT_NAME = "MyNFT";

async function main() {
  const initialOwner = (await ethers.getSigners())[0];

  await deployProxy({
    name: CONTRACT_NAME,
    args: [initialOwner.address],
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

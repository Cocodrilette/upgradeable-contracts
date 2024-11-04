import fs from "fs";

export function saveDeploymentToReport({
  address,
  name,
  args,
  hash,
  deployer,
  network,
}: {
  address: string;
  name: string;
  args: any[];
  hash: string;
  deployer: string;
  network: string;
}) {
  const reportPath = `reports/deployment/${network}.json`;

  let report = [];
  if (fs.existsSync(reportPath)) {
    const content = fs.readFileSync(reportPath).toString();
    report = JSON.parse(content === "" ? "[]" : content);
  } else {
    fs.mkdirSync("reports/deployment", { recursive: true });
  }

  report.push({
    address,
    name,
    args,
    hash,
    deployer,
  });

  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
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

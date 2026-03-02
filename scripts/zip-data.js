const AdmZip = require("adm-zip");
const path = require("path");

async function zipData() {
  const dataDir = path.join(process.cwd(), "data", "cities");
  const zipPath = path.join(process.cwd(), "data.zip");

  console.log(`Zipping ${dataDir} to ${zipPath}...`);

  const zip = new AdmZip();
  // adding the cities folder to the root of the zip file
  // so the zip will just contain the JSON files directly or inside a folder if we want
  // .addLocalFolder adds the contents of the local folder to the archive.
  zip.addLocalFolder(dataDir, "cities");

  zip.writeZip(zipPath);
  console.log("data.zip successfully created!");
}

zipData().catch((err) => {
  console.error("Failed to zip data:", err);
  process.exit(1);
});

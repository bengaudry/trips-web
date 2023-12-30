import { writeFileSync } from "fs";
import { APP_VERSION } from "@/lib/constants/appVersion.js";
import { generateNewVersion } from "@/lib/functions/versions/versions.js";

const versionFilePath = "./src/lib/constants/appVersion.js";

const newVersion = generateNewVersion(APP_VERSION);

const content = `export const APP_VERSION = "${newVersion}";\n`;

writeFileSync(versionFilePath, content, "utf-8");
console.log(`Version updated to ${newVersion} !`);

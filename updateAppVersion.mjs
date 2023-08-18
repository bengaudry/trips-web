import { writeFileSync } from "fs";
import { APP_VERSION } from "./src/lib/constants/appVersion.js";

const versionFilePath = "./src/lib/constants/appVersion.js";

export function generateNewVersion(oldVersion) {
  const nbs = oldVersion.split(".");

  let one = parseInt(nbs[0]);
  let two = parseInt(nbs[1]);
  let three = parseInt(nbs[2]);

  if (three >= 9) {
    three = 0;

    if (two >= 9) {
      two = 0;
      one++;
    } else {
      two++;
    }
  } else {
    three++;
  }

  return `${one}.${two}.${three}`;
}

const newVersion = generateNewVersion(APP_VERSION);

const content = `export const APP_VERSION = "${newVersion}";\n`;

writeFileSync(versionFilePath, content, "utf-8");
console.log(`Version updated to ${newVersion} !`);

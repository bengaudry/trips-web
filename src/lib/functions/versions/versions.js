export function generateNewVersion(oldVersion) {
  const nbs = oldVersion.split(".");

  let one = parseInt(nbs[0]);
  let two = parseInt(nbs[1]);
  let three = parseInt(nbs[2]);
  let four = parseInt(nbs[4]);

  if (four >= 9) {
    four = 0;
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
  } else {
    four++;
  }

  return `${one}.${two}.${three}`;
}

/**
 * Adds a zero before a number (ex: (7) => "07")
 */
export function addZeroBefore(nb: number) {
  let strNb = nb + "";
  if (strNb.length === 1) {
    return `0${nb}`;
  }
  return nb.toString();
}

/**
 * Returns the current date in the format "dd/mm/yyyy"
 *
 */
export function getFormattedDate() {
  let now = new Date();
  let strDate = `${addZeroBefore(now.getDate())}/${addZeroBefore(
    now.getMonth()
  )}/${now.getFullYear()}`;
  return strDate;
}

/**
 * Returns the number of milliseconds between two dates
 * @param date1
 * @param date2 (optionnal : if not provided, calculate from todays dat)
 */
export function getDiffBetweenDates(date1: Date, date2?: Date) {
  if (!date2) date2 = new Date();

  return date2.valueOf() - date1.valueOf();
}

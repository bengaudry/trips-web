export function strTruish(value: string | null | undefined) {
  if (value === null || value === undefined || value === "") {
    return false;
  }
  return true;
}

export function anyTruish(value: any) {
  if (value === null || value === undefined || value.isNaN()) {
    return false;
  }
  return true;
}

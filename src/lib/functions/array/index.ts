export function removeElementAtIndex<T>(array: Array<T>, index: number) {
  return array.slice(0, index).concat(array.slice(index + 1));
}

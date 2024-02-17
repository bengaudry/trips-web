export function removeElementAtIndex<T>(array: Array<T>, index: number) {
  return array.slice(0, index).concat(array.slice(index + 1));
}

export function sortByOccurencesNumber<T>(
  array: Array<T>,
  options?: { keepDoubles?: boolean }
): Array<T> {
  // Créer un objet pour stocker le nombre d'occurrences de chaque élément
  const occurrences: { [key: string]: number } = {};

  // Compter les occurrences de chaque élément dans le tableau
  array.forEach((item) => {
    const stringifiedItem = JSON.stringify(item);
    occurrences[stringifiedItem] = occurrences[stringifiedItem]
      ? occurrences[stringifiedItem] + 1
      : 1;
  });

  // Trier les éléments du tableau en fonction du nombre d'occurrences
  array.sort((a, b) => {
    const occurrencesA = occurrences[JSON.stringify(a)];
    const occurrencesB = occurrences[JSON.stringify(b)];

    // Si le nombre d'occurrences est le même, ordonner par ordre alphabétique
    if (occurrencesA === occurrencesB) {
      return String(a).localeCompare(String(b));
    }

    // Sinon, ordonner par le nombre d'occurrences décroissant
    return occurrencesB - occurrencesA;
  });

  // Retourner le tableau trié
  if (options?.keepDoubles) {
    return array;
  }
  return array.filter((value, i) => array.indexOf(value) === i);
}

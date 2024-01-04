export const separateItemPerRow = (arr: unknown[], itemsPerRow: number = 3) => {
  if (!arr) return [];

  const rowList: any[] = [];
  for (let i = 0; i < arr.length; i += itemsPerRow) {
    const row = arr.slice(i, i + itemsPerRow);
    rowList.push(row);
  }
  return rowList;
};

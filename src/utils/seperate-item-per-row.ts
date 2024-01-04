export const separateItemPerRow = <A = any>(
    arr: A[],
    itemsPerRow: number = 3
): A[][] => {
    if (!arr) return [];

    const rowList: A[][] = [];
    for (let i = 0; i < arr.length; i += itemsPerRow) {
        const row = arr.slice(i, i + itemsPerRow);
        rowList.push(row);
    }
    return rowList;
};

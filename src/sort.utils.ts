

export class SortUtils {
    public static quickSort<T>(unsortedArray: T[]): T[] {

        if (!unsortedArray || unsortedArray.length < 2) {
            return unsortedArray;
        }

        const pivotIndex = unsortedArray.length - 1;
        const pivot = unsortedArray[pivotIndex];

        const left: T[] = [];
        const right: T[] = [];

        for (let i = 0; i < unsortedArray.length; i++) {
            if (i !== pivotIndex) {
                if (unsortedArray[i] <= pivot) {
                    left.push(unsortedArray[i]);
                }
                else {
                    right.push(unsortedArray[i])
                }
            }
        }

        return [...SortUtils.quickSort(left), pivot, ...SortUtils.quickSort(right)];
    }
}
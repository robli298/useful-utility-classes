import { Utils } from "./utils";


export class SortUtils {
    public static quickSort<T extends number | string>(unsortedArray: T[]): T[] {

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

    public static quickSort2<T>(items: T[], leftIndex: number, rightIndex: number): void {
        if (items.length > 1) {
            const index = SortUtils.partition(items, leftIndex, rightIndex);

            if (leftIndex < index - 1) {
                SortUtils.quickSort2(items, leftIndex, index - 1);
            }

            if (index < rightIndex) {
                SortUtils.quickSort2(items, index, rightIndex);
            }
        }
    }

    private static partition<T>(items: T[], leftIndex: number, rightIndex: number): number {
        const pivot = items[Math.floor((leftIndex + rightIndex) / 2)];
        
        let i = leftIndex;
        let j = rightIndex;

        while (i <= j) {
            while (items[i] < pivot) {
                i++;
            }

            while (items[j] > pivot) {
                j--;
            }

            if (i <= j) {
                Utils.swap(items, i, j);
                i++;
                j--;
            }
        }
        return i;
    }
}
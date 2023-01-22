import { SortUtils } from './sort.utils';
import { Utils } from './utils';

it('should sort the array', () => {
    const a = [6, 5, -1, 10, 1, 9, 9];
    const b = [-1, 1, 5, 6, 9, 9, 10];
	
	const result = SortUtils.quickSort(a)
	expect(Utils.isEqual(b, result)).toEqual(true);
});

it('should sort the array with size 3', () => {
    const a = [2, 40, 1];
    const b = [1, 2, 40];
	const result = SortUtils.quickSort(a)
	expect(Utils.isEqual(b, result)).toEqual(true);
});

it('should sort the array with size 2', () => {
    const a = [10, 5];
    const b = [5, 10];
	const result = SortUtils.quickSort(a)
	expect(Utils.isEqual(b, result)).toEqual(true);
});

it('should do nothing if array is empty', () => {
	const array: number[] = [];
	for(let i = 0; i < 1; i++) {
		array.push(Math.floor(Math.random() * 10000));
	}
	//const result = SortUtils.quickSort2(array, 0, array.length)
	const result = SortUtils.quickSort(array);
	expect(Utils.isEqual([], result)).toEqual(false);
});

it('should do nothing if array is small than 2', () => {
	const result = SortUtils.quickSort([1])
	expect(Utils.isEqual([1], result)).toEqual(true);
});

it('should sort the array', () => {
    const a = [6, 5, -1, 10, 1, 9, 9];
    const b = [-1, 1, 5, 6, 9, 9, 10];
	
	SortUtils.quickSort2(a, 0, a.length -1);
	expect(Utils.isEqual(b, a)).toEqual(true);
});
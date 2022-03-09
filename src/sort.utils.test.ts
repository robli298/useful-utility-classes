import {SortUtils} from './sort.utils';
import {Utils} from './utils';

it('Should sort the array', () => {
    const a = [6, 5, -1, 10, 1, 9];
    const b = [-1, 1, 5, 6, 9, 10];
	const result = SortUtils.quickSort(a)
	expect(Utils.isEqual(b, result)).toEqual(true);
});

it('Should sort the array with size 3', () => {
    const a = [2, 40, 1];
    const b = [1, 2, 40];
	const result = SortUtils.quickSort(a)
	expect(Utils.isEqual(b, result)).toEqual(true);
});

it('Should sort the array with size 2', () => {
    const a = [10, 5];
    const b = [5, 10];
	const result = SortUtils.quickSort(a)
	expect(Utils.isEqual(b, result)).toEqual(true);
});

it('should do nothing if array is empty', () => {
	const result = SortUtils.quickSort([])
	expect(Utils.isEqual([], result)).toEqual(true);
});

it('should do nothing if array is small than 2', () => {
	const result = SortUtils.quickSort([1])
	expect(Utils.isEqual([1], result)).toEqual(true);
});
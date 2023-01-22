import { ArrayUtils } from "./array.utils";

it("It should return index 3", () => {
  const a = [1, 3, 4, 8, 23];

  const result = ArrayUtils.binarySearch(a, 8);

  expect(result).toEqual(3);
});

it("It should return index 0, as the search should stop at the first element", () => {
  const a = [1, 3, 4, 8, 23];

  const result = ArrayUtils.binarySearch(a, 1);

  expect(result).toEqual(0);
});

it("It should return index 4, as the search should stop at the last element", () => {
  const a = [1, 3, 4, 8, 23];

  const result = ArrayUtils.binarySearch(a, 23);

  expect(result).toEqual(4);
});

it("It should return index -1, as the search should find any element", () => {
  const a = [1, 3, 4, 8];

  const result = ArrayUtils.binarySearch(a, 24);

  expect(result).toEqual(-1);
});

it("It should return index -1, as the array is empty", () => {
  const a: number[] = [];

  const result = ArrayUtils.binarySearch(a, 24);

  expect(result).toEqual(-1);
});
import { Utils } from './utils';

jest.useFakeTimers();

describe('debounce', () => {
	let func: jest.Mock;
	let debouncedFunc: Function;

	beforeEach(() => {
		func = jest.fn();
	});

	test('execute just once', () => {
		debouncedFunc = Utils.debounce(func, 1000);

		for (let i = 0; i < 100; i++) {
			debouncedFunc();
		}

		// Fast-forward time
		jest.runAllTimers();

		expect(func).toBeCalledTimes(1);
	});

	test('wait value is zero if omitted', () => {
		debouncedFunc = Utils.debounce(func);

		for (let i = 0; i < 100; i++) {
			debouncedFunc();
		}

		jest.runAllTimers();

		expect(func).toBeCalledTimes(1);
	});
});

export class Utils {
	public static debounce(func: Function, wait: number = 0, immediate: boolean = false) {
		let timeout: any;
		return function (this: any) {
			clearInterval(timeout);
			timeout = setTimeout(() => {
				func.apply(this, arguments);
				timeout = null;
			}, wait);

			if (immediate && !timeout) {
				func.apply(this, arguments);
			}
		};
	}
}

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

	public static groupBy<T, K extends keyof T>(data: T[], property: K) {
		return Utils.mapBy<T, K>(data, property).reduce((previous, current) => Object.assign(previous, current), {});
	}

	public static groupByF<T, K extends keyof T>(data: T[], property: K) {

		const result: any = {};

		data.forEach(value => {
			result[value[property]] = value;
		})

		return result;
	}

	private static mapBy<T, K extends keyof T>(data: T[], property: K) {
		return data.map((value) => {
			const key: any = value[property];
			return { [key]: value };
		});
	}
}

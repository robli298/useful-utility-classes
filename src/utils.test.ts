import { Utils } from './utils';

it('', () => {

    class Test {
		name: string = 'Rob';
		constructor() {}
		fn(a: string) {
			console.log(`${this.name} - ${a}`);
		}
	}


    const t = new Test();

	t.fn = Utils.debounce(t.fn, 100, false);
    t.fn('2')

    expect(true).toEqual(true);

});

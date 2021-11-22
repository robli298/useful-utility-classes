import { TreeUtils } from './tree.utils';

const array = [
	{
		key: 1,
		parentKey: null
	},
	{
		key: 2,
		parentKey: 1
	},
	{
		key: 3,
		parentKey: 1
	},
	{
		key: 4,
		parentKey: 2
	},
	{
		key: 5,
		parentKey: 2
	},
	{
		key: 6,
		parentKey: 2
	},
	{
		key: 7,
		parentKey: 3
	},
	{
		key: 8,
		parentKey: 7
	},
	{
		key: 9,
		parentKey: 8
	}
];

it('It have only one root node where the parent key = null', () => {
	const result = TreeUtils.treeFrom(array, { idPropertyName: 'key', parentIdPropertyName: 'parentKey' });
	expect(Object.keys(result).length).toEqual(1);
});

it('It have a first level with 2 children', () => {
    const result = TreeUtils.treeFrom(array, {idPropertyName: 'key', parentIdPropertyName: 'parentKey'});
    expect(result[0].children.length).toEqual(2);
});

it('It should have a node=2 with 3 children', () => {
	const result = TreeUtils.treeFrom(array, { idPropertyName: 'key', parentIdPropertyName: 'parentKey' });
	expect(result[0].children[0].children.length).toEqual(3);
});
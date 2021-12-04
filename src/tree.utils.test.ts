import { TreeUtils } from './tree.utils';

const array = [
	{
		key: 1,
		parentKey: null,
		label: 'root'
	},
	{
		key: 2,
		parentKey: 1,
		label: 'Node2'
	},
	{
		key: 3,
		parentKey: 1,
		label: 'Node3'
	},
	{
		key: 4,
		parentKey: 2,
		label: 'Test'
	},
	{
		key: 5,
		parentKey: 2,
		label: 'Test22'
	},
	{
		key: 6,
		parentKey: 2,
		label: 'Test2'
	},
	{
		key: 7,
		parentKey: 3,
		label: 'test123'
	},
	{
		key: 8,
		parentKey: 7,
		label: 'tea'
	},
	{
		key: 9,
		parentKey: 8,
		label: 'teb'
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

it('It should return three elements for the criteria given', () => {
	const tree = TreeUtils.treeFrom(array, { idPropertyName: 'key', parentIdPropertyName: 'parentKey' });
	const result = TreeUtils.searchBy(tree, 'label', 'te');
	expect(result.length).toEqual(3);
});

it('It should return one element for the criteria given', () => {
	const tree = TreeUtils.treeFrom(array, { idPropertyName: 'key', parentIdPropertyName: 'parentKey' });
	const result = TreeUtils.searchBy(tree, 'label', 'teb');
	expect(result.length).toEqual(1);
});

it('It should return two element for the criteria given', () => {
	const tree = TreeUtils.treeFrom(array, { idPropertyName: 'key', parentIdPropertyName: 'parentKey' });
	const result = TreeUtils.searchBy(tree, 'label', 'Test2');
	expect(result.length).toEqual(2);
});
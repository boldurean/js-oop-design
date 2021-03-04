const cloneDeep = require('lodash/cloneDeep');
const Enumerable = require('../src/enumerable.js');

describe('default', () => {
  test('all', () => {
    const elements = [];
    const coll = Enumerable.wrap(elements);
    const result = coll.all();
    expect(result).toEqual(elements);
    expect(Object.is(elements, result)).toBe(false);
  });

  test('where 1', () => {
    const elements = [
      { key: 'value' },
      { key: '' },
    ];
    const coll = Enumerable.wrap(cloneDeep(elements));
    const result = coll.where('key', 'value');

    const expected = [
      { key: 'value' },
    ];
    expect(result.all()).toEqual(expected);
    expect(coll.all()).toEqual(elements);
  });

  test('where 2', () => {
    const elements = [
      { key: 'value', year: 1932 },
      { key: '', year: 1100 },
      { key: 'value', year: 32 },
    ];
    const coll = Enumerable.wrap(cloneDeep(elements));
    const result1 = coll.where('key', 'value');

    const expected1 = [
      { key: 'value', year: 1932 },
      { key: 'value', year: 32 },
    ];
    expect(result1.all()).toEqual(expected1);
    expect(coll.all()).toEqual(elements);

    const result2 = coll.where('year', 32);
    const expected2 = [
      { key: 'value', year: 32 },
    ];
    expect(result2.all()).toEqual(expected2);
  });
});

// запустится только командой make test-memo
describe('memoization', () => {
  test('where', () => {
    const elements = [
      { key: 'value' },
      { key: '' },
    ];
    const coll = Enumerable.wrap(cloneDeep(elements));
    const result1 = coll.where('key', 'value');
    const allWithoutMemoization = result1.all();
    const allWithMemoization1 = result1.allWithMemoization();
    expect(Object.is(allWithoutMemoization, allWithMemoization1)).toBe(false);

    const allWithMemoization2 = result1.allWithMemoization();
    expect(Object.is(allWithMemoization1, allWithMemoization2)).toBe(true);

    const result2 = result1.where('key', 'value'); // reset memo
    const allWithMemoization3 = result2.allWithMemoization();
    expect(allWithMemoization1).toEqual(allWithMemoization3);
    expect(Object.is(allWithMemoization1, allWithMemoization3)).toBe(false);
  });
});


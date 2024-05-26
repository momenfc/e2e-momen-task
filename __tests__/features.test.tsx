import { filterPriceRangeFeature, searchFeature, sortFeature } from '../src/features';
import { describe, it, expect } from 'vitest';

const mockItems: Item[] = [
  {
    id: 4,
    name: 'Item 4',
    description: 'Description for Item 4',
    price: 40,
  },
  {
    id: 2,
    name: 'Item 2',
    description: 'Description for Item 2',
    price: 30,
  },
];

describe('searchFeature', () => {
  it('should return same list if no search key', () => {
    expect(searchFeature(mockItems, '')).toBe(mockItems);
  });

  it('should return list with items which contains Item 4', () => {
    expect(searchFeature(mockItems, 'Item 4')).toEqual([mockItems[0]]);
  });

  it('should return list with items which contains Item 2', () => {
    expect(searchFeature(mockItems, 'Item 2')).toEqual([mockItems[1]]);
  });
});

describe('filterPriceRangeFeature', () => {
  it('should return all items in list if no minPrice and maxPrice', () => {
    expect(filterPriceRangeFeature(mockItems, '', '')).toEqual(mockItems);
  });

  it('should return list with items which have price between 10 and 50', () => {
    expect(filterPriceRangeFeature(mockItems, '10', '50')).toEqual(mockItems);
  });

  it('should return list with items which have price between 10 and 50 even if inverted', () => {
    expect(filterPriceRangeFeature(mockItems, '50', '10')).toEqual(mockItems);
  });

  it('should return list with items which have price between 40 and 100', () => {
    expect(filterPriceRangeFeature(mockItems, '40', '100')).toEqual([mockItems[0]]);
  });

  it('should return list with items which have price between 10 and 35', () => {
    expect(filterPriceRangeFeature(mockItems, '10', '35')).toEqual([mockItems[1]]);
  });

  it('should return list with items which have price greaterthan or equal 35 if no maxPrice', () => {
    expect(filterPriceRangeFeature(mockItems, '35', '')).toEqual([mockItems[0]]);
  });

  it('should return list with items which have price less than 35 if no minPrice', () => {
    expect(filterPriceRangeFeature(mockItems, '', '35')).toEqual([mockItems[1]]);
  });

  it('should return empty list', () => {
    expect(filterPriceRangeFeature(mockItems, '70', '100')).toEqual([]);
  });

  it('should return list with items which have price equal 30', () => {
    expect(filterPriceRangeFeature(mockItems, '30', '30')).toEqual([mockItems[1]]);
  });
});

describe('sortFeature', () => {
  it('should return same list if no sort key', () => {
    expect(sortFeature(mockItems, '')).toBe(mockItems);
  });

  it('should return sorted list by name', () => {
    expect(sortFeature(mockItems, 'name')).toEqual([mockItems[1], mockItems[0]]);
  });

  it('should return sorted list by lowestPrice', () => {
    expect(sortFeature(mockItems, 'lowestPrice')).toEqual([mockItems[1], mockItems[0]]);
  });

  it('should return sorted list by highestPrice', () => {
    expect(sortFeature(mockItems, 'highestPrice')).toEqual([mockItems[0], mockItems[1]]);
  });
});

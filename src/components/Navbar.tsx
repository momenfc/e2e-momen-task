import { filterPriceRangeFeature, searchFeature, sortFeature } from '@/features';
import React, { useEffect, useState } from 'react';

const sortKeyList: SortKey[] = [
  { value: '', label: 'Sort by' },
  { value: 'name', label: 'Name' },
  { value: 'lowestPrice', label: 'Lowest price' },
  { value: 'highestPrice', label: 'Highest price' },
];

type NavbarProps = {
  items: Item[];
  cartItems: CartItem[];
  setItemsToRender: (items: Item[]) => void;
  setIsCartDrawer: (status: boolean) => void;
};
function Navbar({ items, cartItems, setItemsToRender, setIsCartDrawer }: NavbarProps) {
  const [searchInput, setSearchInput] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortKey, setSortKey] = useState<SortKey['value']>('');

  const getItemsToRender = () => {
    let itemsToRender = items;

    // Handle search by name
    itemsToRender = searchFeature(itemsToRender, searchInput);

    // Handle Filter by price range
    itemsToRender = filterPriceRangeFeature(itemsToRender, minPrice, maxPrice);

    // Handle sorting by
    itemsToRender = sortFeature(itemsToRender, sortKey);

    // Set new item list to render
    setItemsToRender(itemsToRender);
  };

  useEffect(() => {
    getItemsToRender();
  }, [searchInput, minPrice, maxPrice, sortKey, cartItems]);

  return (
    <div className="flex flex-col lg:flex-row gap-2">
      {/* Search bar and Shopping cart button */}
      <div className="flex-1 flex gap-2">
        <input
          className="flex-1 border rounded-sm h-10 ps-4 outline-none"
          type="text"
          placeholder="Search by name"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
        <button
          className="p-2 text-sm whitespace-nowrap overflow-hidden text-ellipsis border rounded bg-blue-500 text-white hover:bg-blue-600 md:hidden"
          onClick={() => setIsCartDrawer(true)}>
          Shopping cart
        </button>
      </div>

      {/* Sort and Filter */}
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Min price"
          className="border rounded-sm h-10 p-2 outline-none flex-1 w-[80px] md:w-[150px]"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max price"
          className="border rounded-sm h-10 p-2 outline-none flex-1 w-[80px] md:w-[150px]"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
        />
        <select
          className="border rounded-sm h-10 p-2 outline-none flex-1 w-[80px] md:w-[150px]"
          name="sortBy"
          title="Sort by"
          onChange={e => setSortKey(e.target.value as SortKey['value'])}>
          {sortKeyList?.map(sortKey => (
            <option key={sortKey.label} value={sortKey.value}>
              {sortKey.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Navbar;

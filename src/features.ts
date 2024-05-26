export const searchFeature = (items: Item[], text: string) => {
  if (!text) return items;
  return items.filter(item => item.name.toLowerCase().includes(text.toLowerCase()));
};

export const filterPriceRangeFeature = (items: Item[], minPrice: string, maxPrice: string) => {
  if (minPrice && maxPrice) {
    if (+minPrice <= +maxPrice) return items.filter(item => item.price >= +minPrice && item.price <= +maxPrice);
    else return items.filter(item => item.price >= +maxPrice && item.price <= +minPrice);
  } else if (minPrice) return items.filter(item => item.price >= +minPrice);
  else if (maxPrice) return items.filter(item => item.price <= +maxPrice);

  return items;
};

export const sortFeature = (items: Item[], sortKey: SortKey['value']) => {
  if (sortKey === 'name') return items?.slice().sort((a, b) => (a.name < b.name ? -1 : a.name < b.name ? 1 : 0));
  else if (sortKey === 'lowestPrice') return items?.slice().sort((a, b) => a.price - b.price);
  else if (sortKey === 'highestPrice') return items?.slice().sort((a, b) => b.price - a.price);
  else return items;
};

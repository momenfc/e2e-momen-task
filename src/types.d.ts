type Item = {
  id: number;
  name: string;
  description: string;
  price: number;
};

type CartItem = {
  id: number;
  item: Item;
};

type SortKey = {
  value: '' | 'name' | 'lowestPrice' | 'highestPrice';
  label: string;
};

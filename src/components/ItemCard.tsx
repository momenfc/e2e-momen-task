import React from 'react';

type ItemCardProps = {
  item: Item;
  onAddBtnClick: (item: Item) => void;
  isItemInCart: (id: number) => boolean;
};
function ItemCard({ item, onAddBtnClick, isItemInCart }: ItemCardProps) {
  return (
    <div key={item.id} className="border p-4 rounded">
      <h2 className="text-xl font-bold mb-2">{item.name}</h2>
      <p className="text-sm">{item.description}</p>
      <div className="flex items-center justify-between border-t pt-3 mt-4">
        <span className="text-lg font-semibold">${item.price}</span>
        <button
          className={`border rounded px-2 py-1 text-sm hover:shadow ${isItemInCart(item.id) ? 'bg-green-500 cursor-not-allowed text-white' : 'bg-white'}`}
          disabled={isItemInCart(item.id)}
          onClick={() => onAddBtnClick(item)}>
          {isItemInCart(item.id) ? 'In cart' : 'Add to cart'}
        </button>
      </div>
    </div>
  );
}

export default ItemCard;

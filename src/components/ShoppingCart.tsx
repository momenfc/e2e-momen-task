import { checkoutFeature } from '@/features';
import React from 'react';

type ShoppingCartProps = {
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
  onRemoveBtnClick: (id: number) => void;
};
function ShoppingCart({ cartItems, setCartItems, onRemoveBtnClick }: ShoppingCartProps) {
  const handleCheckout = async () => {
    checkoutFeature(resData => {
      const newCartItems = resData.data;
      setCartItems(newCartItems);
      alert(`Checkout complete successfully`);
    });
  };

  return (
    <div className="flex flex-col h-full relative">
      <div className="p-4">
        <h4 className="text-lg font-bold">Shopping cart</h4>
        <ul className="space-y-2 border-t pt-2 mt-2">
          {cartItems?.map(cartItem => (
            <li key={cartItem.id} className="flex items-center justify-between gap-4">
              <p>{cartItem.item.name}</p>
              <button className="text-red-500 text-xs" onClick={() => onRemoveBtnClick(cartItem.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="sticky bottom-0 mt-auto w-full">
        <button
          className={`w-full p-2 bg-green-500 text-white hover:bg-green-600 transition ${!cartItems.length ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          disabled={!cartItems.length}
          onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default ShoppingCart;

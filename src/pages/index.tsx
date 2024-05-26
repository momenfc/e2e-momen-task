import ItemCard from './../components/ItemCard';
import ShoppingCart from './../components/ShoppingCart';
import { GetServerSideProps } from 'next';
import { Inter } from 'next/font/google';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { addToCartFeature } from '@/features';

const inter = Inter({ subsets: ['latin'] });

// Uitels
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

type HomeProps = {
  items: Item[];
  cartItems: CartItem[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const [itemsRes, cartItemsRes] = await Promise.all([fetch(baseUrl + '/data/items.json'), fetch(baseUrl + '/api/cart')]);
  const items: Item[] = await itemsRes.json();
  const cartItems = await cartItemsRes.json();
  return { props: { items, cartItems: cartItems.data } };
};

export default function Home({ items, cartItems }: HomeProps) {
  const [currentCartItems, setCurrentCartItems] = useState(cartItems);
  const [itemsToRender, setItemsToRender] = useState(items);
  const [isCartDrawer, setIsCartDrawer] = useState(false);

  const handleAddToCart = async (item: Item) => {
    addToCartFeature(item, resData => {
      const newCartItems = resData.data;
      setCurrentCartItems(newCartItems);
    });
  };

  const handleRemoveCartItem = async (id: number) => {
    try {
      const res = await fetch(baseUrl + '/api/cart', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
      });
      const resData = await res.json();
      console.log('handleRemoveCartItem  resData:', resData);
      if (resData.success) {
        const newCartItems = resData.data;
        setCurrentCartItems(newCartItems);
      }
    } catch (error) {
      console.log('handleRemoveCartItem  error:', error);
    }
  };

  const isItemInCart = (id: Item['id']) => {
    return !!currentCartItems.find(cartItem => cartItem.item.id === id);
  };

  return (
    <>
      <main className={`min-h-screen px-4 py-4 lg:py-12 ${inter.className}`}>
        {/* <main className={`min-h-screen px-4 py-4 lg:py-12 `}> */}
        <div className="flex gap-4">
          <div className="container mx-auto">
            <div className="space-y-4 px-4 py-5 border rounded">
              {/* Navbar */}
              <Navbar items={items} cartItems={currentCartItems} setIsCartDrawer={setIsCartDrawer} setItemsToRender={setItemsToRender} />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6 gap-2 md:gap-4">
              {itemsToRender.map(item => (
                <ItemCard key={item.id} item={item} onAddBtnClick={handleAddToCart} isItemInCart={isItemInCart} />
              ))}
            </div>
          </div>
          {/* Shopping cart */}
          <div className="hidden md:block w-[350px] h-[400px] overflow-auto border rounded">
            <ShoppingCart cartItems={currentCartItems} setCartItems={setCurrentCartItems} onRemoveBtnClick={handleRemoveCartItem} />
          </div>
        </div>
      </main>
      {/* Shopping cart drawer */}
      <div style={{ display: isCartDrawer ? 'block' : 'none' }} className="fixed inset-y-0 end-0 p-4 border rounded bg-white w-[90vw]">
        <button className="p-1 text-5xl text-gray-500 absolute top-4 end-6 z-10" onClick={() => setIsCartDrawer(false)}>
          ×
        </button>
        <ShoppingCart cartItems={currentCartItems} setCartItems={setCurrentCartItems} onRemoveBtnClick={handleRemoveCartItem} />
      </div>
    </>
  );
}

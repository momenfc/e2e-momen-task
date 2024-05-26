import ItemCard from './../components/ItemCard';
import ShoppingCart from './../components/ShoppingCart';
import { GetServerSideProps } from 'next';
import { Inter } from 'next/font/google';
import { useState } from 'react';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

// Uitels
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
type HomeProps = {
  items: Item[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const itemsRes = await fetch(baseUrl + '/data/items.json');
  const items: Item[] = await itemsRes.json();
  return { props: { items } };
};

export default function Home({ items }: HomeProps) {
  const [itemsToRender, setItemsToRender] = useState(items);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartDrawer, setIsCartDrawer] = useState(false);

  const handleAddToCart = (item: Item) => {
    const cartItem: CartItem = {
      id: new Date().getTime(),
      item,
    };
    const newCartItems = [...cartItems, cartItem];
    setCartItems(newCartItems);
  };

  const handleRemoveCartItem = (cartItemId: number) => {
    const newCartItems = cartItems.filter(c => c.id !== cartItemId);
    setCartItems(newCartItems);
  };

  const isItemInCart = (id: Item['id']) => {
    return !!cartItems.find(cartItem => cartItem.item.id === id);
  };

  return (
    <>
      <main className={`min-h-screen px-4 py-4 lg:py-12 ${inter.className}`}>
        <div className="flex gap-4">
          <div className="container mx-auto">
            <div className="space-y-4 px-4 py-5 border rounded">
              {/* Navbar */}
              <Navbar items={items} cartItems={cartItems} setIsCartDrawer={setIsCartDrawer} setItemsToRender={setItemsToRender} />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6 gap-2 md:gap-4">
              {itemsToRender.map(item => (
                <ItemCard key={item.id} item={item} onAddBtnClick={handleAddToCart} isItemInCart={isItemInCart} />
              ))}
            </div>
          </div>
          {/* Shopping cart */}
          <div className="hidden md:block w-[350px] h-[400px] overflow-auto border rounded">
            <ShoppingCart cartItems={cartItems} setCartItems={setCartItems} onRemoveBtnClick={handleRemoveCartItem} />
          </div>
        </div>
      </main>
      {/* Shopping cart drawer */}
      <div style={{ display: isCartDrawer ? 'block' : 'none' }} className="fixed inset-y-0 end-0 p-4 border rounded bg-white w-[90vw]">
        <button className="p-1 text-5xl text-gray-500 absolute top-4 end-6 z-10" onClick={() => setIsCartDrawer(false)}>
          ×
        </button>
        <ShoppingCart cartItems={cartItems} setCartItems={setCartItems} onRemoveBtnClick={handleRemoveCartItem} />
      </div>
    </>
  );
}

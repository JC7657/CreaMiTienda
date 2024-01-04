import { createContext, useState, useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import urls from '../resources/urls';
import { Product } from '../types';

const CartContext = createContext<any>(null);
const CartContextProvider = ({ children }: any) => {
  const CART_LOCAL_STORAGE_KEY = 'cart';
  const [cart, setCart] = useState<Product[]>(() => {
    const savedCart = localStorage.getItem(CART_LOCAL_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [product, setProduct] = useState<Product[]>([]);

  const { data: fetchedProduct, error: productError } = useFetch<Product[]>("http://localhost:3000/productos");

  useEffect(() => {
    localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (fetchedProduct) {
      setProduct(fetchedProduct);
    }
  }, [fetchedProduct]);

  const addToCart = (product: Product) => {
    const newCart = [...cart];
    const item = newCart.find((item) => item._id === product._id);
    if (item) item.quantity += 1;
    else newCart.push({ ...product, quantity: 1 });
    setCart(newCart);
  };

  const removeFromCart = (product: Product) => {
    const newCart = [...cart];
    const item = newCart.find((item) => item._id === product._id);
    if (item) {
      if (item.quantity > 1) item.quantity -= 1;
      else newCart.splice(newCart.indexOf(item), 1);
    }
    setCart(newCart);
  };

  const removeAllFromCart = (product: Product) => {
    const newCart = [...cart];
    const item = newCart.find((item) => item._id === product._id);
    if (item) newCart.splice(newCart.indexOf(item), 1);
    setCart(newCart);
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.precio * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0) || 0;
  };

  const emptyCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        product,
        setProduct,
        addToCart,
        removeFromCart,
        getTotal,
        getTotalItems,
        removeAllFromCart,
        emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartContextProvider };
export default CartContext;

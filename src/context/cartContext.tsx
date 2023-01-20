import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import axiosInstance from '../utils/axiosInstance';
import { CartType } from '../../types/types';

type CartContextType = {
  loadCart: () => Promise<void>;
  cart: CartType[];
};

export const CartContext = createContext<CartContextType>({
  loadCart: async () => {},
  cart: [],
});

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = useState<CartType[]>([]);

  const loadCart = useCallback(async () => {
    try {
      const res = await axiosInstance.get<CartType[]>('660/cart', {});
      setCart(res.data);
    } catch (error) {}
  }, []);

  const value = useMemo(
    () => ({
      cart,
      loadCart,
    }),
    [cart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);

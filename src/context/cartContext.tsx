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
import useErrorHandle from '../hooks/useErrorHandle';

type CartContextType = {
  loadCart: () => Promise<void>;
  addToCart: (data: CartType) => Promise<void>;
  updateCartItem: (data: CartType) => Promise<void>;
  deleteCartItem: (data: CartType) => Promise<void>;
  cart: CartType[];
};

export const CartContext = createContext<CartContextType>({
  loadCart: async () => {},
  addToCart: async () => {},
  updateCartItem: async () => {},
  deleteCartItem: async () => {},
  cart: [],
});

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cart, setCart] = useState<CartType[]>([]);
  const handleError = useErrorHandle();

  const loadCart = useCallback(async () => {
    try {
      const res = await axiosInstance.get<CartType[]>('660/cart');
      setCart(res.data);
    } catch (error) {
      handleError(error);
    }
  }, []);

  const addToCart = useCallback(async (data: CartType) => {
    try {
      const res = await axiosInstance.post<CartType>('660/cart', data);
      setCart((val) => [...val, res.data]);
    } catch (error) {
      handleError(error);
    }
  }, []);

  const updateCartItem = useCallback(async (data: CartType) => {
    try {
      const res = await axiosInstance.put<CartType>(
        `660/cart/${data.id}`,
        data,
      );
      setCart((val) => {
        const index = val.findIndex((x) => x.id === data.id);
        return [...val.slice(0, index), res.data, ...val.slice(index + 1)];
      });
    } catch (error) {
      handleError(error);
    }
  }, []);

  const deleteCartItem = useCallback(async (data: CartType) => {
    try {
      await axiosInstance.delete<CartType>(`660/cart/${data.id}`);
      setCart((val) => {
        const index = val.findIndex((x) => x.id === data.id);
        return [...val.slice(0, index), ...val.slice(index + 1)];
      });
    } catch (error) {
      handleError(error);
    }
  }, []);

  const value = useMemo(
    () => ({
      cart,
      loadCart,
      addToCart,
      updateCartItem,
      deleteCartItem,
    }),
    [cart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);

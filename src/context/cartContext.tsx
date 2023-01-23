import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
} from 'react';
import axiosInstance from '../utils/axiosInstance';
import { CartType, StatusType } from '../../types/types';
import useErrorHandle from '../hooks/useErrorHandle';
import {
  CartReducer,
  CartValueType,
  cartInitStateValue,
} from '../reducers/cartReducer';

type CartContextType = {
  loadCart: () => Promise<void>;
  addToCart: (data: CartType) => Promise<void>;
  updateCartItem: (data: CartType) => Promise<void>;
  deleteCartItem: (data: CartType) => Promise<void>;
  cart: CartType[];
  loading: StatusType[];
};

export const CartContext = createContext<CartContextType>({
  loadCart: async () => {},
  addToCart: async () => {},
  updateCartItem: async () => {},
  deleteCartItem: async () => {},
  cart: [],
  loading: [],
});

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [{ cart, loading }, dispatch] = useReducer(
    CartReducer,
    cartInitStateValue,
  );
  const handleError = useErrorHandle();

  const loadCart = useCallback(async () => {
    try {
      dispatch({ type: 'LOAD_CART_REQUEST', payload: {} });
      const res = await axiosInstance.get<CartType[]>('660/cart');
      dispatch({ type: 'LOAD_CART_SUCCESS', payload: res.data });
    } catch (error) {
      handleError(error);
      dispatch({ type: 'LOAD_CART_FAIL', payload: error });
    }
  }, []);

  const addToCart = useCallback(async (data: CartType) => {
    try {
      dispatch({
        type: 'ADD_CART_REQUEST',
        payload: { productId: data.productId },
      });
      const res = await axiosInstance.post<CartType>('660/cart', data);
      dispatch({ type: 'ADD_CART_SUCCESS', payload: res.data });
    } catch (error) {
      dispatch({ type: 'ADD_CART_FAIL', payload: error });
    }
  }, []);

  const updateCartItem = useCallback(async (data: CartType) => {
    try {
      dispatch({
        type: 'UPDATE_CART_REQUEST',
        payload: { productId: data.productId },
      });
      const res = await axiosInstance.put<CartType>(
        `660/cart/${data.id}`,
        data,
      );
      dispatch({
        type: 'UPDATE_CART_SUCCESS',
        payload: res.data,
      });
    } catch (error) {
      handleError(error);
      dispatch({
        type: 'UPDATE_CART_FAIL',
        payload: error,
      });
    }
  }, []);

  const deleteCartItem = useCallback(async (data: CartType) => {
    try {
      dispatch({
        type: 'DELETE_CART_REQUEST',
        payload: { productId: data.productId },
      });
      await axiosInstance.delete<CartType>(`660/cart/${data.id}`);
      dispatch({
        type: 'DELETE_CART_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'DELETE_CART_FAIL',
        payload: error,
      });
    }
  }, []);

  const value = useMemo(
    () => ({
      cart,
      loading,
      loadCart,
      addToCart,
      updateCartItem,
      deleteCartItem,
    }),
    [cart, loading],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);

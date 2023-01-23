import { CartType, ProductType } from '../../types/types';
import axiosInstance from '../utils/axiosInstance';

export const loadCart = () => async (dispatch) => {
  try {
    dispatch({
      type: 'LOAD_CART_REQUEST',
      meta: {
        loadingId: -1,
      },
    });
    const res = await axiosInstance.get<ProductType[]>('660/cart');
    dispatch({
      type: 'LOAD_CART_SUCCESS',
      payload: res.data,
      meta: { loadingId: -1 },
    });
  } catch (error) {
    dispatch({
      type: 'LOAD_CART_FAIL',
      payload: error,
      meta: { loadingId: -1 },
    });
  }
};

export const addToCart = (data: CartType) => async (dispatch) => {
  try {
    dispatch({
      type: 'ADD_CART_REQUEST',
      meta: { loadingId: data.productId },
    });
    const res = await axiosInstance.post<CartType>('660/cart', data);
    dispatch({
      type: 'ADD_CART_SUCCESS',
      payload: res.data,
      meta: { loadingId: data.productId },
    });
  } catch (error) {
    dispatch({
      type: 'ADD_CART_FAIL',
      payload: error,
      meta: { loadingId: data.productId },
    });
  }
};

export const updateCartItem = (data: CartType) => async (dispatch) => {
  try {
    dispatch({
      type: 'UPDATE_CART_REQUEST',
      meta: { loadingId: data.productId },
    });
    const res = await axiosInstance.put<CartType>(`660/cart/${data.id}`, data);
    dispatch({
      type: 'UPDATE_CART_SUCCESS',
      payload: res.data,
      meta: { loadingId: data.productId },
    });
  } catch (error) {
    dispatch({
      type: 'UPDATE_CART_FAIL',
      payload: error,
      meta: { loadingId: data.productId },
    });
  }
};

export const deleteCartItem = (data: CartType) => async (dispatch) => {
  try {
    dispatch({
      type: 'DELETE_CART_REQUEST',
      meta: { loadingId: data.productId },
    });
    await axiosInstance.delete<CartType>(`660/cart/${data.id}`);
    dispatch({
      type: 'DELETE_CART_SUCCESS',
      payload: data,
      meta: { loadingId: data.productId },
    });
  } catch (error) {
    dispatch({
      type: 'DELETE_CART_FAIL',
      payload: error,
      meta: { loadingId: data.productId },
    });
  }
};

import { ProductType } from '../../types/types';
import axiosInstance from '../utils/axiosInstance';

export const loadProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: 'LOAD_PRODUCTS_REQUEST',
      meta: { loadingId: -1 },
    });
    const res = await axiosInstance.get<ProductType[]>('660/products');
    dispatch({
      type: 'LOAD_PRODUCTS_SUCCESS',
      payload: res.data,
      meta: { loadingId: -1 },
    });
  } catch (error) {
    dispatch({
      type: 'LOAD_PRODUCTS_FAIL',
      payload: error,
      meta: { loadingId: -1 },
    });
  }
};

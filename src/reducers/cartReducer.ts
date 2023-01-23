import { StatusType, CartType } from '../../types/types';

export type CartValueType = {
  cart: CartType[];
  loading: StatusType[];
  error: StatusType[];
};

export const cartInitStateValue: CartValueType = {
  cart: [],
  loading: [],
  error: [],
};

export const CartReducer = (state, { type, payload }) => {
  const match = /(.*)_(REQUEST|SUCCESS|FAIL)/.exec(type);
  let loading = [] as StatusType[];
  let error = [] as StatusType[];
  if (match) {
    const [, actionName, actionType] = match;
    if (actionType === 'REQUEST') {
      loading = [
        ...state.loading,
        {
          id: payload.productId || -1,
          actionName,
          actionType,
        },
      ];
    } else {
      loading = state.loading.filter(
        (x) =>
          !(x.id === (payload.productId || -1) && x.actionName === actionName),
      );
    }

    if (actionType === 'FAIL') {
      error = [
        ...state.error,
        {
          id: payload.productId || -1,
          actionName,
          actionType,
        },
      ];
    } else {
      error = state.error.filter(
        (x) =>
          !(x.id === (payload.productId || -1) && x.actionName === actionName),
      );
    }
  }

  switch (type) {
    case 'LOAD_CART_REQUEST':
    case 'ADD_CART_REQUEST':
    case 'UPDATE_CART_REQUEST':
    case 'DELETE_CART_REQUEST':
      return {
        ...state,
        loading,
        error,
      };

    case 'LOAD_CART_SUCCESS':
      return {
        ...state,
        loading,
        error,
        cart: payload,
      };

    case 'ADD_CART_SUCCESS':
      return {
        ...state,
        loading,
        error,
        cart: [...state.cart, payload],
      };

    case 'UPDATE_CART_SUCCESS': {
      const index = state.cart.findIndex((x) => x.id === payload.id);
      return {
        ...state,
        loading,
        error,
        cart: [
          ...state.cart.slice(0, index),
          payload,
          ...state.cart.slice(index + 1),
        ],
      };
    }

    case 'DELETE_CART_SUCCESS': {
      const index = state.cart.findIndex((x) => x.id === payload.id);
      return {
        ...state,
        loading,
        error,
        cart: [...state.cart.slice(0, index), ...state.cart.slice(index + 1)],
      };
    }

    case 'LOAD_CART_FAIL':
    case 'ADD_CART_FAIL':
    case 'UPDATE_CART_FAIL':
    case 'DELETE_CART_FAIL':
      return {
        ...state,
        loading,
        error,
      };

    default:
      return state;
  }
};

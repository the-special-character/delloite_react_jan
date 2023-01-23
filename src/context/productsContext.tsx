import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import axiosInstance from '../utils/axiosInstance';
import { ProductType } from '../../types/types';
import { useAuth } from './authContext';
import useErrorHandle from '../hooks/useErrorHandle';

type ProductsContextType = {
  loadProducts: () => Promise<void>;
  products: ProductType[];
};

export const ProductsContext = createContext<ProductsContextType>({
  loadProducts: async () => {},
  products: [],
});

export const ProductsProvider = ({ children }: PropsWithChildren) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const handleError = useErrorHandle();

  const loadProducts = useCallback(async () => {
    try {
      const res = await axiosInstance.get<ProductType[]>('660/products', {});
      setProducts(res.data);
    } catch (error) {
      handleError(error);
    }
  }, []);

  const value = useMemo(
    () => ({
      products,
      loadProducts,
    }),
    [products],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
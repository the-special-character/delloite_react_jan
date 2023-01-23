import React, { useEffect } from 'react';
import Product from '../../components/Product';

type Props = {};

const Home = ({ products, loadProducts, loadCart }: Props) => {
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      await Promise.all([loadProducts(), loadCart()]);
    } catch (error) {}
  };

  return (
    <div>
      {products?.map((product) => {
        return <Product product={product} key={product.id} />;
      })}
    </div>
  );
};

export default Home;

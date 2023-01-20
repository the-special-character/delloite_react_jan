import React, { useEffect } from 'react';
import { useProducts } from '../../context/productsContext';

type Props = {};

const Home = (props: Props) => {
  const { products, loadProducts } = useProducts();

  useEffect(() => {
    loadProducts();
  }, []);

  console.log(products);

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export default Home;

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import Header from '../components/Header';
import { ProductsProvider } from '../context/productsContext';
import { CartProvider } from '../context/cartContext';

type Props = {};

const MainLayout = (props: Props) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div>
      <CartProvider>
        <ProductsProvider>
          {/* <Header /> */}
          <main>
            <Outlet />
          </main>
        </ProductsProvider>
      </CartProvider>
      <footer></footer>
    </div>
  );
};

export default MainLayout;

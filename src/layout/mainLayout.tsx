import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import Header from '../components/Header';
import { ProductsProvider } from '../context/productsContext';

type Props = {};

const MainLayout = (props: Props) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div>
      <Header />
      <ProductsProvider>
        <main>
          <Outlet />
        </main>
      </ProductsProvider>
      <footer></footer>
    </div>
  );
};

export default MainLayout;

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import Header from '../components/Header';

type Props = {};

const MainLayout = (props: Props) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};

export default MainLayout;

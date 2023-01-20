import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {};

const Home = (props: Props) => {
  const navigate = useNavigate();

  const routeToAbout = () => {
    navigate('/about', {
      replace: true,
      state: {
        a: 1,
        b: 2,
      },
    });
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button type="button" onClick={routeToAbout}>
        Click Me
      </button>
    </div>
  );
};

export default Home;

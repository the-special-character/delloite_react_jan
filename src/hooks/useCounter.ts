import { useState } from 'react';

const useCounter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount((val) => val + 1);
  };

  const decrement = () => {
    setCount((val) => val - 1);
  };

  return {
    count,
    increment,
    decrement,
  };
};

export default useCounter;

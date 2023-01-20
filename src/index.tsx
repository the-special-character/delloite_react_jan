import React, { Component, useEffect, useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import Todo from './todo';
import './style.css';
import { FilterType } from '../types/types';
// import App from './app';
import App1 from './app1';
import { LocaleProvider } from './context/localeContext';
import { TodoProvider } from './context/todoContext';
import useCounter from './hooks/useCounter';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  class Test extends Component {
    state = {
      name: 'yagnesh modh',
      count: 0,
      error: null,
    };

    changeName = () => {
      this.setState({ name: 'rohit sharma' });
    };

    static getDerivedStateFromError(error) {
      return {
        error,
      };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
      // server call
      console.log('errorInfo', errorInfo.componentStack);
    }

    render() {
      console.log('render test');
      const { count, error } = this.state;

      if (error) {
        return <h1>{error.message}</h1>;
      }

      return (
        <div>
          {count < 5 && <App1 name={this.state.name} />}
          <button type="button" onClick={this.changeName}>
            Change Name
          </button>
          <button
            type="button"
            onClick={() =>
              this.setState(({ count }, props) => {
                return { count: count + 1 };
              })
            }
          >
            Change Count
          </button>
        </div>
      );
    }
  }

  const UnMount = () => {
    useEffect(() => {
      const mouseMove = () => {
        console.log('Mouse Move');
      };

      document.addEventListener('mousemove', mouseMove);

      const interval = setInterval(() => {
        console.log('interval');
      }, 1000);
      // component will unmount
      return () => {
        document.removeEventListener('mousemove', mouseMove);
        clearInterval(interval);
      };
    }, []);

    return <h1>Hello</h1>;
  };

  const Hooks = () => {
    const { count, increment, decrement } = useCounter();
    const {
      count: value,
      increment: valueIncrement,
      decrement: valueDecrement,
    } = useCounter();
    const isMounted = useRef(false);

    // component Did Mount
    // component did Update
    // never write useEffect without second parameter
    // useEffect(() => {
    //   console.log('Hooks');
    // });

    useEffect(() => {
      if (isMounted.current === true) {
        console.log('Component Did update for count or value');
      }
    }, [value, count]);

    // component Did Mount
    useEffect(() => {
      console.log('Component Did mount');
      isMounted.current = true;
    }, []);

    // component Did Mount
    // component did Update only when count value change

    return (
      <div>
        {value < 5 && <UnMount />}
        <div>
          <button type="button" onClick={valueIncrement}>
            +
          </button>
          {value}
          <button type="button" onClick={valueDecrement}>
            -
          </button>
        </div>
        <div>
          <button type="button" onClick={increment}>
            +
          </button>
          {count}
          <button type="button" onClick={decrement}>
            -
          </button>
        </div>
      </div>
    );
  };

  root.render(
    <LocaleProvider>
      <TodoProvider>
        <Todo />
      </TodoProvider>
      {/* <App logoText="Yagnesh Modh" heading="Banner Page" /> */}
      {/* <Test /> */}
      {/* <Hooks /> */}
    </LocaleProvider>,
  );
}

import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import Todo from './todo';
import './style.css';
import { FilterType } from '../types/types';
// import App from './app';
import App1 from './app1';

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

  root.render(
    <>
      <Todo />
      {/* <App logoText="Yagnesh Modh" heading="Banner Page" /> */}
      {/* <Test /> */}
    </>,
  );
}

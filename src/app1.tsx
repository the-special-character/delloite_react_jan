import React, { Component } from 'react';

type Props = {};

type State = {
  count: number;
};

class App1 extends Component<Props, State> {
  // Local memeory
  state = {
    count: 0,
  };

  constructor(props: Props) {
    super(props);
    // this.increment = this.increment.bind(this);
    // this.decrement = this.decrement.bind(this);
  }

  increment = () => {
    // sst
    // this.setState({ count: this.state.count + 1 });

    // ssf
    this.setState(({ count }, props) => {
      return {
        count: count + 1,
      };
    });
  };

  decrement = () => {
    // this.setState({ count: this.state.count - 1 });
    this.setState(({ count }, props) => {
      return {
        count: count - 1,
      };
    });
  };

  render() {
    // cs
    const { count } = this.state;

    return (
      <div>
        <button type="button" onClick={this.increment}>
          +
        </button>
        <p>{count}</p>
        <button type="button" onClick={this.decrement}>
          -
        </button>
      </div>
    );
  }
}

export default App1;

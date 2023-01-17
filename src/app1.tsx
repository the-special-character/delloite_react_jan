import React, { Component } from 'react';

type Props = {
  name: string;
};

type State = {
  count: number;
  userName: string;
};

// mounting
// 1, constructor
// 2. getDerivedStateFromProps
// 3. render
// 4. componentDidMount

// updating

// unmounting

// error

class App1 extends Component<Props, State> {
  // Local memeory

  // call only once
  constructor(props: Props) {
    super(props);

    this.state = {
      count: 0,
      userName: '',
      user: null,
    };
    // this.increment = this.increment.bind(this);
    // this.decrement = this.decrement.bind(this);
    // fetch('https://jsonplaceholder.typicode.com/todos/1')
    //   .then((res) => res.json())
    //   .then((json) => {
    //     this.setState({
    //       user: json,
    //     });
    //   });
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    const { name } = props;

    const nameArr = name.split(' ');

    const firstName = `${nameArr[0][0].toUpperCase()}${nameArr[0].slice(1)}`;
    const lastName = `${nameArr[1][0].toUpperCase()}${nameArr[1].slice(1)}`;
    return {
      userName: `${firstName} ${lastName}`,
    };
  }

  // fetch data from server
  // register events
  // manipulate dom element
  // call only once
  async componentDidMount() {
    try {
      document.addEventListener('copy', () => {
        console.log('coppied');
      });
      const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      const json = await res.json();
      this.setState({ user: json });
    } catch (error) {}
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
    console.log('render app1');
    // cs
    const { count, userName, user } = this.state;
    const { name } = this.props;

    return (
      <div>
        <h1 id="heading">{name}</h1>
        <h1>{userName}</h1>

        {user && <h2>{user.title}</h2>}

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

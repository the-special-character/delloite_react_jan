import React, { PureComponent } from 'react';
import shallowCompare from 'react-addons-shallow-compare'; // ES6

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
// getDerivedStateFromProps
// shouldComponentUpdate
// render
// getSnapshotBeforeUpdate
// componentDidUpdate

// unmounting
// componentWillUnmount

// error
// getDerivedStateFromError
// componentDidCatch

class App1 extends PureComponent<Props, State> {
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

  // shouldComponentUpdate(nextProps, nextState) {
  //   return shallowCompare(this, nextProps, nextState);
  //   // if (this.props !== nextProps || this.state !== nextState) {
  //   //   return true;
  //   // }
  //   // return false;
  // }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    return 10;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(snapshot);
  }

  // fetch data from server
  // register events
  // manipulate dom element
  // call only once
  mouseMove = () => {
    console.log('mousemove');
  };

  async componentDidMount() {
    try {
      document.addEventListener('mousemove', this.mouseMove);
      this.interval = setInterval(() => {
        console.log('interval');
      }, 1000);
      const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      const json = await res.json();
      this.setState({ user: json });
    } catch (error) {}
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.mouseMove);
    clearInterval(this.interval);
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

    if (count > 5) {
      throw new Error('somethig went wrong....');
    }

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

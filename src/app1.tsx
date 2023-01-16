import React, { Component } from 'react';

type Props = {
  logoText: string;
  heading: string;
};

type State = {
  number: number;
};

// let number = 0;

// component will rerender only if
// 1. Props value change
// 2. state value change

// State is mutable
class App1 extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      number: 0,
    };
  }

  // method overriding
  render() {
    console.log('render');

    const { heading, logoText } = this.props;
    const { number } = this.state;

    return (
      <>
        <header>
          <a href="">{logoText}</a>
          <nav
            style={
              {
                // backgroundColor: bgColor,
                // color: txtColor,
              }
            }
          >
            <ul className="list">
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
              <li>Item 4</li>
              <li>Item 5</li>
            </ul>
          </nav>
        </header>
        <main>
          <h1>{heading}</h1>
          <button
            type="button"
            onClick={() => {
              this.setState({
                number: 5,
              });
            }}
          >
            +
          </button>
          <p>{number}</p>
          <button type="button">-</button>
        </main>
      </>
    );
  }
}

export default App1;

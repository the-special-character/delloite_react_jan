import React from 'react';

// Rules
// 1. Fist latter of the function name should be upper case
// 2. from 1 component return only single element
// 3. style property should be object and property name should be in camel
// 4. instead of clas we should use className property

type Props = {
  logoText: string;
  heading: string;
};

// Props are immutable
const App = ({ logoText, heading }: Props) => {
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
      </main>
    </>
  );
};

export default App;

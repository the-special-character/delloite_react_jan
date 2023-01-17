# delloite_react_jan

setup webpack

1. npm init -y
2. npm install -D webpack
3. add `"build": "webpack",` in script section on package.json
4. create src folder and add more then 1 file and implement export and import
5. npm run build

webpack configuration

1. create webpack.config.js
2. add entry, ouput, mode in webpack.config.js file
3. setup babel go to babel website
4. install `npm install --save-dev babel-loader @babel/core`
5. install `npm install --save-dev @babel/preset-env`
6. create .babelrc file and add following code

   ```json
   {
     "presets": ["@babel/preset-env"]
   }
   ```

setup eslint prittier and typescript

1. execute `npm init @eslint/config` and answer question base on requirement and then it will create ".eslintrc.js" file
   visit this [link](https://eslint.org/) for more details

2. execute `npx tsc --init` and then make follwoing changes in "tsconfig.json" file

```json
{
  "target": "es5",
  "jsx": "react",
  "module": "es6",
  "moduleResolution": "node",
  "allowJs": true,
  "allowSyntheticDefaultImports": true,
  "esModuleInterop": true,
  "forceConsistentCasingInFileNames": true,
  "noImplicitAny": true
}
```

3. run following command to install prettier

`npm install --save-dev --save-exact prettier`
`echo {}> .prettierrc.json`

visit this [link](https://prettier.io/docs/en/install.html) for more details

4. add following code in ".prettierrc.json"

```json
{
  "singleQuote": true,
  "trailingComma": "all"
}
```

5. install "eslint-config-prettier" by executing following code `npm install --save-dev eslint-config-prettier` and add follwing code in extends section of ".eslintrc.js" file

```json
{
  "extends": ["some-other-config-you-use", "prettier"]
}
```

visit this [link](https://github.com/prettier/eslint-config-prettier) for more details

setup for the react js

1. create public folder at root level and add index.html file and add only root div inside html file
2. setup HtmlWebpackPlugin for webpack.config.js execute `npm install -D html-webpack-plugin` and add following code in "webpack.config.js"

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
  ],
};
```

3. execute command to install react and react-dom along with types `npm install react react-dom` and `npm install -D @types/react @types/react-dom`

4. create index.tsx file in src folder and add following code

```javascript
import React from 'react';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);

  root.render(<h1>hello react</h1>);
}
```

4. install follwing library for babel `npm install -D @babel/preset-typescript @babel/preset-react`
   and make changes in .babelrc file

```json
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-typescript",
    "@babel/preset-react"
  ]
}
```

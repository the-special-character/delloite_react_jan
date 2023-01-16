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

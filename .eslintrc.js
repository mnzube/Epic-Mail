module.exports = {
    "extends":"airbnb-base"
};
module.exports = {
    parser: "babel-eslint",
    parserOptions: {
      ecmaVersion: 6,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
        modules: true,
        experimentalObjectRestSpread: true
      },
        env: 
{
      es6: true,
      browser: true,
      node: true,
      jest: true
    },
}}
// @flow

import './App/Config/ReactotronConfig'
import React from 'react';
import App from './App/Containers/App'

console.log("app.js")
export default class MyApp extends React.Component {
  render() {
    return (
      <App />
    );
  }
}

import React from 'react';
import ReactDOM from 'react-dom';
import 'element-theme-default';
import './index.css';
import { Main } from './container';
import reportWebVitals from './reportWebVitals';
import configureStore from './store';
import { Provider } from 'react-redux';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Main />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

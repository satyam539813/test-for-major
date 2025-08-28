 import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// ---------------------------
// Suppress ResizeObserver loop error in Chrome
// ---------------------------
const observerErr = (err) => {
  if (
    err.message &&
    err.message.includes(
      "ResizeObserver loop completed with undelivered notifications"
    )
  ) {
    return; // ignore the error
  }
  console.error(err); // log other errors normally
};

window.addEventListener("error", observerErr);
window.addEventListener("unhandledrejection", observerErr);

// ---------------------------
// Render React App
// ---------------------------
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Optional: If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

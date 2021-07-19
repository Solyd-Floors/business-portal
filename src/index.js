import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from "./store";
import "./index.css"

function float2int (value) {
  console.log({a:value , b: value | 0})
  return value | 0;
}

global.get_token = () => {
  let token = localStorage.getItem("solyd_floors_business:token");
  return token 
}
global.string_to_qs = params => Object.keys(params)
  .map(key => `${key}=${params[key]}`)
  .join('&');

global.sqft_to_boxes = sqft => {
  let val = Number(sqft)
  console.log({vallllll: val})
  // let ten_percent = val * 0.1
  // val += ten_percent
  val /= 23.4
  if (float2int(val) === val) return { val };
  else val = float2int(val) + 1
  return { val, more: true };
}

global.prettifyPrice = price => {
  let splitted = String(price).split(".")
  if (!(splitted.length > 1)) return price;
  let [ val, val2 ] = splitted
  if (String(val2).length == 1) val2 += 0; 
  return val + '.' + val2.slice(0,2)
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

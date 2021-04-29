import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


const base = process.env.NODE_ENV==='production'?'https://forca-jogo.herokuapp.com':'http://localhost:3000'

document.addEventListener("keydown", function(e){
	if (e.ctrlKey && e.altKey && e.keyCode==123){
		e.preventDefault();
		window.location.href = `${base}/admin`
	}
}, false);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

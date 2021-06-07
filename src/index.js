import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


const base = 'https://forca-jogo.herokuapp.com'

document.addEventListener("keydown", function(e){
	if (e.ctrlKey && e.altKey && e.keyCode==123){
		e.preventDefault();
		window.location.href = `${base}/admin`
	}
}, false);

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

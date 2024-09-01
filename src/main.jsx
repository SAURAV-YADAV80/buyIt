import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import AlertProvider from './providers/alertProvider';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AlertProvider>
      <App />
      </AlertProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ReactDom from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Account from './components/Account.jsx'


ReactDom.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/account" element={<Account/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

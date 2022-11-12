import React from 'react';
import ReactDOM from 'react-dom/client';
import "./css/index.css";
import { BrowserRouter } from "react-router-dom"
import { App } from './screens/app';
import { UserContextProvider } from './services/user.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
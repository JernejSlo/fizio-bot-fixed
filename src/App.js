import logo from './logo.svg';

import { Link } from 'react-router-dom';

import './App.css';
import Header from "./Components/Header";
import React from "react";
import {store} from "./store";
import {Provider} from "react-redux";

function App() {
  return (
      <div>
          <Header />
          <div style={{ backgroundColor: '#F0F2F5', height: 'calc(100vh - 60px)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Link to="/sign-up" style={{ backgroundColor: '#0077C9', color: '#fff', padding: '20px 40px', borderRadius: '5px', cursor: 'pointer', textDecoration: 'none' }}>Register</Link>
            </div>
          </div>
      </div>
  );
}

export default App;

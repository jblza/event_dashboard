import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import 'typeface-rubik';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <div className="App">
      <Navbar fixed="top">
        <Navbar.Brand className="pageTitle">
          <img
            src="/radar_logo.png"
            height="30"
            className="d-inline-block align-top"
            alt="Radar"
          />
        </Navbar.Brand>
      </Navbar>
      <Dashboard />
    </div>
  );
}

export default App;

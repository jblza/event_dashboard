import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Navbar from 'react-bootstrap/Navbar';
//import createMuiTheme from 
import 'typeface-rubik';

/*const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'typeface-rubik',
      'sans-serif',
      '-apple-system'
    ].join(','),
  },
}); */

function App() {
  return (
    <div className="App">
      <Navbar fixed="top">
        <Navbar.Brand id="pageTitle">
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

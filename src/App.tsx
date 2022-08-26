import React from 'react';
import { LandingPage } from "./pages/LandingPage";
import { ProgrammingPage } from "./pages/ProgrammingPage";
import { Header } from "./components/Header";
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Toolbar } from '@mui/material';

function App() {

  return (
    <BrowserRouter>
      <Header/>
      <Toolbar/>
      {/* <LandingPage></LandingPage> */}
      <ProgrammingPage></ProgrammingPage>
    </BrowserRouter>
    
  );
}

export default App;

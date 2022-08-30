import React, { useEffect, useState } from 'react';
import { LandingPage } from "./pages/LandingPage";
import { ProgrammingPage } from "./pages/ProgrammingPage";
import { Header } from "./components/Header";
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Toolbar } from '@mui/material';

import { io, Socket } from 'socket.io-client';


function App() {
  const [userName, setUserName] = useState('');

  //connects to server
  const socket: Socket = io('http://localhost:3001');
  
  useEffect(()=> {
      //   whenever a connection is made
      socket.on('connect', () => {
        console.log(`You connected with id: ${socket.id}`);
      })

      socket.on("disconnect", () => {
        console.log(`${socket.id} has been disconnected`); 
      });
  },[])

  return (
    <BrowserRouter>
      <Header/>
      <Toolbar/>
      <LandingPage userName={userName} setUserName={setUserName} socket={socket} />
      <ProgrammingPage socket={socket}></ProgrammingPage>
    </BrowserRouter>
    
  );
}

export default App;

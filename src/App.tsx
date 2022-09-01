
import React, { useEffect, useState } from 'react';
import { LandingPage } from "./routes/LandingPage";
import { ProgrammingPage } from "./routes/ProgrammingPage";
import { io, Socket } from 'socket.io-client';
import './App.css';
import {
  Routes,
  Route,
  // Link,
} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';


export default function App() {
  const [theme, setTheme] = useState('light');
  const [userName, setUserName] = useState('');
  //connects to server
  const [socket] = useState(io('http://localhost:3001')) 

  const darkTheme = createTheme({
  palette: {
    mode: theme as PaletteMode,
  },
  });

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

      <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <Routes>
      <Route path="/" element={<LandingPage userName={userName} setUserName={setUserName} socket={socket} theme={theme} setTheme={setTheme}/>} />
      <Route path="/pp/:roomId" element={<ProgrammingPage socket={socket} userName={userName} theme={theme} setTheme={setTheme}/>} />
      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
         </Routes>
      </ThemeProvider>
 
  )

}


import React, { useEffect, useState } from 'react';
import { LandingPage } from "./routes/LandingPage";
import { ProgrammingPage } from "./routes/ProgrammingPage";
import { Header } from "./components/Header";
import { io, Socket } from 'socket.io-client';
import './App.css';
import {
  Routes,
  Route,
  // Link,
} from "react-router-dom";

export default function App() {
    
  const [userName, setUserName] = useState('');
  //connects to server
  const [socket] = useState(io('http://localhost:3001')) 

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
    <Routes>
   {/* <Header/> */}
      <Route path="/" element={<LandingPage userName={userName} setUserName={setUserName} socket={socket}/>} />
      <Route path="/pp/:roomId" element={<ProgrammingPage socket={socket} userName={userName}/>} />
      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Routes>
  )

}

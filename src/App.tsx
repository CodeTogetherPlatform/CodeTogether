import React from 'react';
import { LandingPage } from "./routes/LandingPage";
import { ProgrammingPage } from "./routes/ProgrammingPage";
import { Header } from "./components/Header";
import './App.css';
import {
  Routes,
  Route,
  Link,
} from "react-router-dom";

export default function App() {

  return (
    <>
    <Routes>
   {/* <Header/> */}
      <Route path="/" element={<LandingPage/>} />
      <Route path="/programmingpage" element={<ProgrammingPage/>} />
      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Routes>
    </>
  );
}
  


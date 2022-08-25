import React, {useEffect} from 'react'
import Button from '@mui/material/Button';
import { io } from "socket.io-client";
// const io = require("socket.io-client");

const socket = io('localhost:3001');

interface LandingPageProps {};

type LandingPageComponent = (props: LandingPageProps) => JSX.Element;

export const LandingPage: LandingPageComponent = () => {

    useEffect(() => {
        socket.on('message', (message) => console.log(message));
    },[]);
  const createRoom = () => {
    socket.emit('message', 'hbvsdifhgv');
  }

  return (
    <Button variant="contained" onClick={createRoom}>HUGE BUTTON</Button>
  )
}
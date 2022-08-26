import React from 'react';
import { io } from 'socket.io-client';

//connects to server
const socket = io('http://localhost:3001');
//whenever a connection is made
socket.on('connect', () => {
  console.log(`You connected with id: ${socket.id}`)
})
socket.on('receive-message', string => {
  console.log(string);
})
//emit will take any event and send to server
socket.emit('custom-event', 'parameters here, can do multiple parameters, this is a static string')

interface ProgrammingPageProps {
  
}
type ProgrammingPageComponent = (props: ProgrammingPageProps) => JSX.Element;

export const ProgrammingPage: ProgrammingPageComponent = ({}) => {
  return (
    <div>
    
    </div>
  )
}
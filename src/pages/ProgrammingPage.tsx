import React, { useEffect } from 'react';
import Button from '@mui/material/Button';

interface ProgrammingPageProps {
  socket: any;
}
type ProgrammingPageComponent = (props: ProgrammingPageProps) => JSX.Element;

export const ProgrammingPage: ProgrammingPageComponent = ({ socket }) => {

    useEffect(()=>{
        socket.on('new-message', (message: string, username: string) => {
            console.log(`This is what we get when new-message activates, message: ${message} username: ${username}`);
            /**
             * Add message to chat box state
             */
          });
          
          socket.on('code-change', (code: string, senderId: string) => {
              if(senderId !== socket.id) {
                  //update the code block
              }
          })
    })

  const handleClick = () => {
    socket.emit('custom-event', 'Evan McNeely is here!');
  }
  return (
    <Button variant="contained" onClick={handleClick}>Push This</Button>
  )
}
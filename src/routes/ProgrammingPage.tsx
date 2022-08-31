import React, {useEffect, useState} from 'react';
import {Header} from '../components/Header'
import {ProblemBox} from '../components/ProblemBox'
import {ChatBox} from '../components/ChatBox'
import { Container, Grid, Box, Paper } from '@mui/material'
import Button from '@mui/material/Button';
import {useParams} from 'react-router-dom';

/*
Create logic so they can choose if they are driver or navigator
*/

interface ProgrammingPageProps {
  socket: any;
  username: string;
}

type ProgrammingPageComponent = (props: ProgrammingPageProps) => JSX.Element;

export const ProgrammingPage: ProgrammingPageComponent = ({socket, username}) => {
    const[partner, setPartner] = useState('');
  const { roomId }= useParams();

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

      // start the process of exchanging usernames  
      socket.emit('get-pp', roomId);

      // when username is requested, send it to the room
      socket.on('requested-pp', ()=> {
        socket.emit('send-pp', roomId, username);
      });

      // when a username is recieved, save it as a partner
      socket.on('receive-pp', (pp: string) => {
        if(pp !== username) setPartner(pp);
      })
})

  return (
    <>
      <Header />
        <Container>
          <Paper variant='outlined' elevation={3} >
            <Box sx={{display:'flex', justifyContent:'center'}} >
              <h1>{`Hello ${username}, you are working with ${partner}`}</h1>
            </Box>
            <Grid container >
              <Grid id='blue1' xs={6}>
                <Grid id='gold1'>
                  <ProblemBox />
                </Grid>
                <Grid id='gold2'>
                  {/* 
                  Navigator can see the problem, and has a button that the reveal the instructions to the Driver
                  For the Driver the code is hidden and reveal button disabled
                  */}
                  <Button> Reveal instructions to driver </Button>
                </Grid>
                <Grid id='gold3'>
                  
                </Grid>
              </Grid>
              <Grid id='blue2' xs={4}> 
                <ChatBox/>
              </Grid>
            </Grid>
          </Paper>
        </Container>
    </>
  )
}





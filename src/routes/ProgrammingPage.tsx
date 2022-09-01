import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header'
import { ProblemBox } from '../components/ProblemBox'
import { ChatBox } from '../components/ChatBox'
import { Container, Grid, Box, Paper, Typography } from '@mui/material'
import Button from '@mui/material/Button';
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { javascript } from '@codemirror/lang-javascript';
import {useParams} from 'react-router-dom';

interface ProgrammingPageProps {
  socket: any;
  username: string;
}

type ProgrammingPageComponent = (props: ProgrammingPageProps) => JSX.Element;

export const ProgrammingPage: ProgrammingPageComponent = ({socket, username}) => {
    const[partner, setPartner] = useState('');
  const { roomId }= useParams();

  const [code, setCode] = useState("// ADD CODE HERE | Remember to return your value to see output");
  const [output, setOutput] = useState('');


  useEffect(() => {
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

    socket.on('code-change', (code: string, senderId: string) => {
      if (senderId !== socket.id) {
        //update the code block
      }
    })
  });

  const handleClick = () => {
    // socket.emit('custom-event', 'Evan McNeely is here!');
    // setOutput(eval(code));
    var result = new Function(code)();
    setOutput(result);

  }

  return (
    <>
      <Header />
      <Container>
        <Paper variant='outlined' elevation={0} >
          <Box sx={{ display: 'flex', justifyContent: 'center' }} >
            <h1>{`Hello ${username}, you are working with ${partner}`}</h1>
          </Box>
          <Grid container >
            <Grid id='blue1' item xs={6}>
              <Grid id='gold1'>
                <ProblemBox />
              </Grid>
              <Grid id='gold2'>
                <CodeMirror
                  value={code}
                  height="800px"
                  theme={dracula}
                  extensions={[javascript({ jsx: true })]}
                  onChange={(value: any, viewUpdate: any) => {
                    setCode(value);
                  }}
                />
                <Button> Reveal instructions to driver </Button>
              </Grid>
              <Grid id='gold3'>
                <Typography>{output}</Typography>
              </Grid>
            </Grid>
            <Grid id='blue2' item xs={4}>
              <ChatBox />
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Button variant="contained" onClick={handleClick}>Run Code</Button>
    </>
  )
}





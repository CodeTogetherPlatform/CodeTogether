import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header'
import { ProblemBox } from '../components/ProblemBox'
import { ChatBox } from '../components/ChatBox'
import { Container, Grid, Box, Paper, Typography } from '@mui/material'
import Button from '@mui/material/Button';
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { javascript } from '@codemirror/lang-javascript';


/*
Create logic so they can choose if they are driver or navigator
*/

interface ProgrammingPageProps {
  socket: any;
}

type ProgrammingPageComponent = (props: ProgrammingPageProps) => JSX.Element;

const user1: string = 'User 1';
const user2: string = 'User 2';

export const ProgrammingPage: ProgrammingPageComponent = ({ socket }) => {
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
      if (senderId !== socket.id) {
        //update the code block
      }
    })
  })

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
            <h1>{`Hello ${user1}, you are working with ${user2}`}</h1>
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
                  onChange={(value, viewUpdate) => {
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





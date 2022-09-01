import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header'
import { ProblemBox } from '../components/ProblemBox'
import { ChatBox } from '../components/ChatBox'
import { Container, Grid, Box, Paper, Typography } from '@mui/material'
import Button from '@mui/material/Button';
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { javascript } from '@codemirror/lang-javascript';
import { useParams } from 'react-router-dom';

interface ProgrammingPageProps {
  userName: string;
  socket: any;
}

type ProgrammingPageComponent = (props: ProgrammingPageProps) => JSX.Element;

export const ProgrammingPage: ProgrammingPageComponent = ({ socket, userName }) => {
  const [partner, setPartner] = useState('');
  const { roomId } = useParams();

  const [code, setCode] = useState("// ADD CODE HERE | Remember to return your value to see output");
  const [output, setOutput] = useState('');

  useEffect(() => {
    socket.on('new-message', (message: string, userName: string) => {
      console.log(`This is what we get when new-message activates, message: ${message} userName: ${userName}`);
      /**
       * Add message to chat box state
       */
    });

    socket.on('code-change', (code: string, senderId: string) => {
      if (senderId !== socket.id) {
        //update the code block
      }
    })

    // start the process of exchanging userNames  
    socket.emit('get-pp', roomId);

    // when userName is requested, send it to the room
    socket.on('requested-pp', () => {
      socket.emit('send-pp', roomId, userName);
    });

    // when a userName is recieved, save it as a partner
    socket.on('receive-pp', (pp: string) => {
      if (pp !== userName) setPartner(pp);
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

  if(!roomId){
    return <Typography>Error: No room id</Typography>
  }

  return (
    <>
      <Header />
      <Container>
        <Paper variant='outlined' elevation={0} >
          <Box sx={{ display: 'flex', justifyContent: 'center' }} >
            <h1>{`Hello ${userName}, you are working with ${partner}`}</h1>
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
                <Button variant="contained"> Reveal instructions to driver </Button>
              </Grid>
              <Grid id='gold3'>
                <Typography variant="h1" sx={{ background: "main" }}>{output}</Typography>
              </Grid>
            </Grid>
            <Grid id='blue2' item xs={4}>
              <ChatBox userName={userName} socket={socket} joinedRoomId={roomId} />
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Button variant="contained" onClick={handleClick}>Run Code</Button>
    </>
  )
}





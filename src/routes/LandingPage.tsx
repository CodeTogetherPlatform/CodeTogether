
import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import { Box, TextField, Select, List, ListItemButton, ListItemText } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { Header } from '../components/Header'

interface LandingPageProps {
  setUserName: any;
  userName: string;
  socket: any;
  theme: string;
  setTheme: any;
};

// this is needed to use the option tag as a JSX Element in the MUI Select component
declare global {
  namespace JSX {
    interface IntrinsicElements {
      option: React.DetailedHTMLProps<React.OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>;
    }
  }
}

type LandingPageComponent = (props: LandingPageProps) => JSX.Element;

export const LandingPage: LandingPageComponent = ({ setUserName, userName, socket, theme, setTheme }) => {
  const navigate = useNavigate();
  // have state for rooms
  const [roomList, setRoomList] = useState<string[]>([]);
  const [roomToJoin, setRoomToJoin] = useState<null | string>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // establish event listeners 
  useEffect(() => {
    //handling errors
    socket.on('error-event', (error: string) => {
      console.log('error:', error);
    })

    // emits an event to get all the rooms
    socket.emit('get-rooms');
    // receives an event to get the rooms and adds them to state
    socket.on('send-all-rooms', (rooms: Array<string>) => {
      setRoomList(rooms);
    });

    // receives an event to start programming and redirects users
    socket.on('start-programming', (roomId: string) => {
      console.log('time to redirect to programming page with roomId: ', roomId)
      navigate(`pp/${roomId}`, { replace: true })
    });

  }, []);

  // starts a session, making sure the session id doesn't already exist
  const startSession = () => {
    // each session id is a 6 length integer
    // ensure that the 6 digit integer is unique
    if (userName === '') {
      return;
    }
    let randomRoomInt = Math.floor(Math.random() * 1000000);
    while (roomList.some((el) => el[0] === randomRoomInt.toString())) {
      randomRoomInt = Math.floor(Math.random() * 1000000);
    }
    socket.emit('start-session', String(randomRoomInt));
  };

  // join a session, depending on the room selected
  const joinSession = () => {
    if (roomToJoin) {
      socket.emit('join-session', roomToJoin);
    }
  }

  // sets roomToJoin to the selected room
  const handleChangeRoom = (roomNumSelected: any, index: number): void => {
    setSelectedIndex(index);
    setRoomToJoin(roomNumSelected);
  }

  return (
    <>
      <Header theme={theme} setTheme={setTheme}/>
      <div style={{ maxHeight: '100%', maxWidth: '100%' }}>


        <Box style={{ display: 'flex', alignItems: "center", justifyContent: "center", height: '600px' }} >

          <Box sx={{ display: 'flex', flexDirection: 'column', maxHeight: '100%' }}>
            <TextField sx={{ m: 1 }} label='Enter an username' variant='outlined' onChange={(event: any) => { setUserName(event.target.value) }}></TextField>
            <Button sx={{ m: 1 }} variant="contained" size="large" onClick={startSession}>Start A Session</Button>
            <Button sx={{ m: 1 }} variant="contained" size="large" onClick={joinSession}>Join Session</Button>
          </Box>
          <Box sx={{ m: 1 }}>
            <List component="nav" aria-label="secondary mailbox folder" sx={{ }}>
              {roomList.map((roomNum, index) => (
                <ListItemButton selected={selectedIndex === index} key={index} onClick={(event) => handleChangeRoom(roomNum, index)}><ListItemText primary={roomNum}/></ListItemButton>
              ))}
            </List>
          </Box>

        </Box>

      </div>
    </>
  )
}
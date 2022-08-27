import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import{ Box, TextField, Card, Select } from '@mui/material';

interface LandingPageProps { 
    setUserName: React.Dispatch<React.SetStateAction<string>>;
    userName: string;
    socket: any;
};

// this is needed to use the option tag as a JSX Element in the MUI Select component
declare global {
  namespace JSX {
    interface IntrinsicElements {
      option: React.DetailedHTMLProps<React.OptionHTMLAttributes<HTMLOptionElement >, HTMLOptionElement>;
    }
  }
}

type LandingPageComponent = (props: LandingPageProps) => JSX.Element;

export const LandingPage: LandingPageComponent = ({ setUserName, userName, socket }) => {
    // have state for rooms
    const [roomList, setRoomList] = useState<string[]>([]);
    const [roomToJoin, setRoomToJoin] = useState<null | string>(null)
    
    // establish event listeners 
    useEffect(()=> {
        //handling errors
         socket.on('error-event', (error: any) => {
            console.log('error:', error);
        })
        
        // emits an event to get all the rooms
        socket.emit('get-rooms');

        // receives an event to get the rooms and adds them to state
        socket.on('send-all-rooms', (rooms: Array<string>)=>{
            console.log(rooms)
          setRoomList(rooms);
        });

        // receives an event to start programming and redirects users
        socket.on('start-programming', (roomId: any) => {
            console.log('time to redirect to programming page with roomId: ', roomId)
            /**
             * Redirect users to the programming page with the roomId as a parameter
             */
        });
    },[]);

    // starts a session, making sure the session id doesn't already exist
    const startSession = () => {
        // each session id is a 6 length integer
        // enusure that the 6 digit integer is unique
        let randomRoomInt = Math.floor(Math.random() * 1000000);
        while(roomList.some((el) => el[0] === randomRoomInt.toString())){
          randomRoomInt = Math.floor(Math.random() * 1000000);
        }
        socket.emit('start-session', String(randomRoomInt));
    };

    // join a session, depending on the room selected
    const joinSession = () => {
        if(roomToJoin) {
            socket.emit('join-session', roomToJoin);
        }
    }

    // sets roomToJoin to the selected room
    const handleChangeRoom = (event: any):void => {
      const options = event.target.options;
      for (let i = 0, l = options.length; i < l; i += 1) {
        if (options[i].selected) {
          setRoomToJoin(options[i].value);
          break;
        }
      }
    }

  return (
    <div style={{maxHeight:'100%', maxWidth: '100%'}}>

    <Box style={{display: 'flex', justifyContent: 'space-around', }} >
      <Box sx={{display: 'flex', flexDirection:'column', justifyContent: 'space-around', p: 1, m: 1, maxHeight:'100%' }}>
        <TextField sx={{m:1}} label='UserName' variant='outlined' onChange={(event) => {setUserName(event.target.value)}}></TextField>
        <Button sx={{m:1}} variant="contained" size="large" onClick={startSession}>Start A Session</Button>
        <Button sx={{m:1}}variant="contained" size="large" onClick={joinSession}>Join Session</Button>
      </Box>
      <Box sx={{m:1}}>
        <Select multiple native onChange={handleChangeRoom} label="Native"
          inputProps={{
            id: 'select-multiple-native',
          }}
        >
          {roomList.map((roomNum) => (
            <option key={roomNum}>
              {roomNum}
            </option>
          ))}
        </Select>
      </Box>

    </Box>
   
    </div>
  )
}
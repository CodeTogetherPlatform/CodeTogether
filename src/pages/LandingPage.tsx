import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import{ Box, TextField, Card, Select } from '@mui/material';
import { io } from 'socket.io-client';

interface LandingPageProps { 
    setUserName: React.Dispatch<React.SetStateAction<string>>;
    userName: string;
    socket: any;
};

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
    const [roomList, setRoomList] = useState<any[]>([]);
    const [roomToJoin, setRoomToJoin] = useState<null | string>(null)
    useEffect(()=> {
        //handling errors
         socket.on('error-event', (error: any) => {
            console.log(error);
        })
        
        socket.emit('get-rooms');

        socket.on('send-all-rooms', (rooms: any)=>{
          console.log("This is the rooms coming in: ", rooms)
          console.log(JSON.stringify(rooms))
          let roomListArray = [];
          for(let i = 0; i < rooms.length; i++){
            if(JSON.stringify(rooms[i][0]).length === 6){
              roomListArray.push(rooms[i][0])
            }
          }
          console.log(roomListArray);
          setRoomList(roomListArray);
        });
    },[]);

    const startSession = () => {
        let randomRoomInt = Math.floor(Math.random() * 1000000);
        while(roomList.some((el) => el[0] === randomRoomInt.toString())){
          randomRoomInt = Math.floor(Math.random() * 1000000);
        }
        socket.emit('start-session', randomRoomInt);
    };

    const joinSession = () => {
        socket.emit('join-session', roomToJoin);
    }

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
        <Button sx={{m:1}}variant="contained" size="large">Join Session</Button>
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
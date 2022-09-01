import {
  Button,
  Paper,
  Card,
  Box,
  Typography,
  TextField
} from '@mui/material'
import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';

interface messageProps {
  username: string;
  message: string;
}

interface ChatBoxProps {
  userName: string;
  socket: any;
  joinedRoomId: string;
};

type ChatBoxComponent = (props: ChatBoxProps) => JSX.Element;
interface MessageObject {
  message: string;
  userName: string;
}

export const ChatBox: ChatBoxComponent = ({ userName, joinedRoomId, socket }) => {

  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState<MessageObject[]>([]);

  socket.on('new-message', (messageR: string, userNameR:string) => {
    const messageObject = { 'message': messageR, 'userName': userNameR }
    setMessageList([...messageList, messageObject]);
  })

  const MessageList = () => {
    return (
      <List>
        {messageList.map((message: MessageObject, index: number) => {
          return (
            <ListItem key={index}>
              <ListItemText
                primary={message.userName}
                secondary={message.message}
              />
            </ListItem>
          )
        })}
      </List>
    )
  }

  const sendMessage = () => {
    if (message) {
      socket.emit('message-created', userName, message, joinedRoomId);
    }
  }


  return (
    <>
      <Paper>
        <Typography>Chat Box</Typography>
        <Card>
          <Box>
            <MessageList />
          </Box>
          <Box>
            <TextField size='small' onChange={(event: any) => { setMessage(event.target.value) }}>Message</TextField>
            <Button variant='contained' onClick={sendMessage}>submit</Button>
          </Box>
        </Card>
      </Paper>
    </>
  )
}

/*
  - at bottom textarea and a submit button
  - add messages to a fi
*/


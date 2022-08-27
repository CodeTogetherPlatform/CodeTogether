import { 
  Button, 
  Paper, 
  Card, 
  Box, 
  Typography, 
  TextField  
} from '@mui/material'
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';

interface messageProps {
  msgId: number;
  username: string;
  message: string;
}
const messages: messageProps[] = [
  {
    msgId: 1,
    username: 'Patrick',
    message: 'yo'
  },
  {
    msgId: 2,
    username: 'Yuki',
    message: 'hey'
  }
]


interface ChatBoxProps {};

type ChatBoxComponent = (props: ChatBoxProps) => JSX.Element;

export const ChatBox: ChatBoxComponent = () => {
  return (
    <>
    <Paper>
      <Typography>Chat Box</Typography>
      <Card>
        <Box>
          <MessageList />
        </Box>
        <Box>
          <TextField size='small'>Message</TextField>
        <Button variant='contained'>submit</Button>
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

const MessageList = () => {
  return(
      <List>
        {messages.map(message => {
          return (
            <ListItem key={message.msgId}>
              <ListItemText
                primary = {message.username}
                secondary = {message.message}
              />
            </ListItem>
          )
        })}
      </List>
  ) 
}
import React from 'react'
import Button from '@mui/material/Button';
import { ProgrammingPage } from './ProgrammingPage';
import{ Box, TextField, Card } from '@mui/material';
import {
  Routes,
  Route,
  Link,
} from "react-router-dom";
import {Header} from '../components/Header'

interface LandingPageProps { };

type LandingPageComponent = (props: LandingPageProps) => JSX.Element;

export const LandingPage: LandingPageComponent = () => {
  return (
    <>
    <Header />
    <div style={{maxHeight:'100%', maxWidth: '100%'}}>

    <Box style={{display: 'flex', justifyContent: 'space-around', height:'600px'}} >
      

      <Box sx={{display: 'flex', flexDirection:'column', justifyContent: 'space-around', p: 1, m: 1, maxHeight:'100%' }}>
        <TextField sx={{m:1}} label='UserName' variant='outlined' defaultValue={'Type Username Here'}></TextField>
        <Button sx={{m:1}} variant="contained" size="large">Start A Session</Button>
        <Button sx={{m:1}}variant="contained" size="large">Join Session</Button>
      </Box>
      <Box sx={{m:1}}>
      <Card variant="outlined" sx={{p:1, m:10}}>Sessions will live here, render different component?
      <h3>Open Sessions</h3>
        <Link to="/programmingpage">Join session 1</Link>
        <p>Join session 2</p>
        <p>Join session 3</p>
        
      </Card>
      </Box>

    </Box>
   
    </div>
    </>
  )
}
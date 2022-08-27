import React from 'react';
import {Header} from '../components/Header'
import {ProblemBox} from '../components/ProblemBox'
import {ChatBox} from '../components/ChatBox'
import { Container, Grid, Box, Paper } from '@mui/material'
import Button from '@mui/material/Button';

/*
Create logic so they can choose if they are driver or navigator
*/

interface ProgrammingPageProps {};

type ProgrammingPageComponent = (props: ProgrammingPageProps) => JSX.Element;

const user1: string = 'User 1';
const user2: string = 'User 2';

export const ProgrammingPage: ProgrammingPageComponent = () => {
  return (
    <>
      <Header />
        <Container>
          <Paper variant='outlined' elevation={3} >
            <Box sx={{display:'flex', justifyContent:'center'}} >
              <h1>{`Hello ${user1}, you are working with ${user2}`}</h1>
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





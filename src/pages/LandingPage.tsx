import React from 'react'
import Button from '@mui/material/Button';
import{ Box, TextField, Card } from '@mui/material';

interface LandingPageProps { };

type LandingPageComponent = (props: LandingPageProps) => JSX.Element;

export const LandingPage: LandingPageComponent = () => {
  return (
    <div style={{maxWidth: '100%'}}>

    <Box style={{display: 'flex', justifyContent: 'space-around'  }} >
      

      <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', p: 1, m: 1, }}>
        <TextField sx={{m:1}} label='UserName' variant='outlined' defaultValue={'Type Username Here'}></TextField>
        <Button sx={{m:1}} variant="contained" size="large">Start A Session</Button>
        <Button sx={{m:1}}variant="contained" size="large">Join Session</Button>
      </Box>
      <Box>
      <Card variant="outlined">This is an MUI Card to put sessions</Card>
      </Box>

    </Box>
   
    </div>
  )
}
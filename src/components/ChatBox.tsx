import React from 'react'
import Button from '@mui/material/Button';

interface ChatBoxProps {};

type ChatBoxComponent = (props: ChatBoxProps) => JSX.Element;

export const LandingPage: ChatBoxComponent = () => {
  return (
    <Button variant="contained">HUGE BUTTON</Button>
  )
}
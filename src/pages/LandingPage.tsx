import React from 'react'
import Button from '@mui/material/Button';

interface LandingPageProps {};

type LandingPageComponent = (props: LandingPageProps) => JSX.Element;

export const LandingPage: LandingPageComponent = () => {
  return (
    <Button variant="contained">HUGE BUTTON</Button>
  )
}
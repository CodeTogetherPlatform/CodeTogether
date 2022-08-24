import React from 'react'
import Button from '@mui/material/Button';

interface ProblemBoxProps {};

type ProblemBoxComponent = (props: ProblemBoxProps) => JSX.Element;

export const LandingPage: ProblemBoxComponent = () => {
  return (
    <Button variant="contained">HUGE BUTTON</Button>
  )
}
import React from 'react'
import AppBar from '@mui/material/AppBar';
// import { Toolbar } from '@mui/material';
import { Typography } from '@mui/material';

interface HeaderProps {
  
}
type HeaderComponent = (props: HeaderProps) => JSX.Element;

export const Header: HeaderComponent = ({}) => {
  return (
    <AppBar position='sticky'>
        <Typography variant="h3">CodeTogether</Typography>
    </AppBar>
  )
}
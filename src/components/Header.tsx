import React from 'react'
import AppBar from '@mui/material/AppBar';
// import { Toolbar } from '@mui/material';
import { Typography, Button, Toolbar } from '@mui/material';

interface HeaderProps {
  theme: string;
  setTheme: any;
}
type HeaderComponent = (props: HeaderProps) => JSX.Element;

export const Header: HeaderComponent = ({ theme, setTheme }) => {
  return (
    <AppBar position='sticky'>
      <Toolbar>
        <Typography variant="h3" sx={{ flexGrow: 1, pl: 2 }}>CodeTogether</Typography>
        <Button variant="contained" sx={{ background: () => (theme === 'light' ? 'purple' : 'yellow')} } onClick={() => { theme === 'light' ? setTheme('dark') : setTheme('light') }}>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</Button>
      </Toolbar>
    </AppBar>
  )
}
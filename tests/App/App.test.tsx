import React from 'react';
import { render, screen } from '@testing-library/react';
import { LandingPage } from '../../src/routes/LandingPage';
import { BrowserRouter } from "react-router-dom";

const socket = {on: jest.fn(), emit: jest.fn()}
const setUserName = jest.fn();

test('renders learn react link', () => {
  render(<BrowserRouter><LandingPage userName={'hi'} socket={socket} setUserName={setUserName}/></BrowserRouter>);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
});

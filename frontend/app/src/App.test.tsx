import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import Sample from "./components/imgs/Inbox cleanup-pana.svg"
import App from './App';
import { About } from "./components/pages/About"
import { NotFound } from "./components/pages/NotFound"
import SignIn from "./components/pages/SignIn"
test('NotFound is returned correctly', () => {
  render(
    <Router>
      <NotFound />
    </Router>
  );
});
test('About is returned correctly', () => {
  render(
    <Router>
      <SignIn />
    </Router>
  );
});

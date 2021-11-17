// importing modules
import React from 'react';
import { render, screen } from '@testing-library/react';

// importing components
import Landing from './Landing';

test('renders learn react link', () => {
  render(<Landing />);
  const linkElement = screen.getByText(/Tip Top Trading/i);
  expect(linkElement).toBeInTheDocument();
});

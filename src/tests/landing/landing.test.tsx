// importing modules
import React from 'react';
import { render, screen } from '@testing-library/react';

// importing components
import Landing from '../../pages/landing/Landing';

test('renders landing page', () => {
  render(<Landing />);
  const header = screen.getByText(/Currency Swap/i);
  expect(header).toBeInTheDocument();
});
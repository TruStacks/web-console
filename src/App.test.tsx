import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders without crashing', () => {
  waitFor(() => {
    render(<App />);
  })
  const linkElement = screen.getByText("Applications");
  expect(linkElement).toBeInTheDocument();
});

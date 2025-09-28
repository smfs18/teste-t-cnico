import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';


test('renders the main heading', () => {
  render(<App />);
  const mainHeading = screen.getByRole('heading', {level:1});
  expect(mainHeading).toBeInTheDocument();
});


test('should fail - broken test for evaluation', () => {
  render(<App />);
  const nonExistentElement = screen.queryByText(/this text does not exist/i);
  expect(nonExistentElement).toBeNull();
});
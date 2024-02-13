import { render, screen } from '@testing-library/react';
import App from './App.js';

test('renders welcome message', () => {
  render(<App />);
  const welcomeMessage = screen.getByText(/Welcome to My MERN App/i);
  expect(welcomeMessage).toBeInTheDocument();
});

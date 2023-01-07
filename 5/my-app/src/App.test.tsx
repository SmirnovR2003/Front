import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App editor={{
    selectedBlocks: [],
    canvas: {
      size: {
        width: 0,
        heigth: 0
      },
      background: null,
      filter: null,
      blocks: []
    },
    history: [],
    templates: []
  }} />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

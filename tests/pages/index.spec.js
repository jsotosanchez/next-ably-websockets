import React from 'react';
import { render, screen } from '@testing-library/react';
import Index from '@/pages/index';

describe('App', () => {
  it('renders without crashing', () => {
    const result = render(<Index />);
    expect(screen.getByRole('heading', { name: 'heading' })).toBeInTheDocument();
  });
});

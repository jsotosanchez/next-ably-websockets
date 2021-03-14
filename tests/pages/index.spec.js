import { render, screen } from '@testing-library/react';
import Index from '@/pages/index';

describe('App', () => {
  it('renders without crashing', () => {
    render(<Index />);
    expect(screen.getByRole('heading', { name: 'heading' })).toBeInTheDocument();
  });
});

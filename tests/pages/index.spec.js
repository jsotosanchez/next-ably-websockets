import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import Index from '@/pages/index';
import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/router';

jest.mock('next/router');
jest.mock('@/components/AuthProvider');

describe('Index page', () => {
  let expectedSignIn = jest.fn();
  let expectedRouterPush = jest.fn();
  beforeEach(() => {
    expectedSignIn.mockResolvedValue('');
    useAuth.mockReturnValue({
      signinWithGoogle: expectedSignIn,
      userId: 123,
    });
    useRouter.mockReturnValue({ push: expectedRouterPush });
  });

  it('it should have a button for signing in', () => {
    const { getByText } = render(<Index />);

    const signInButton = getByText('Sign me in!');

    expect(signInButton).toBeDefined();
  });

  it('should fire the signInEvent', async () => {
    const { getByText } = render(<Index />);
    const signInButton = getByText('Sign me in!');
    await act(async () => {
      fireEvent.click(signInButton);
    });

    expect(expectedSignIn).toHaveBeenCalled();
    expect(expectedRouterPush).toHaveBeenCalled();
  });

  it('it should have a button for skipping sign in', () => {
    const { getByText } = render(<Index />);

    const signInButton = getByText('I wanna see it first');

    expect(signInButton).toBeDefined();
  });

  it('should fire router push', async () => {
    const { getByText } = render(<Index />);
    const navigateButton = getByText('I wanna see it first');
    await act(async () => {
      fireEvent.click(navigateButton);
    });

    expect(expectedRouterPush).toHaveBeenCalled();
  });
});

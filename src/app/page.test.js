/* eslint-disable */
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RootPage from './page';

describe('Testing Main Menu / Root Page Component', () => {
  it('renders the main welcome page elements', async () => {
    render(<RootPage />);

    // verify existing text elements
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
    expect(screen.getByText(/Miscord/i)).toBeInTheDocument();
    expect(screen.getByText(/This app/i)).toBeInTheDocument();
    expect(screen.getByText(/This project/i)).toBeInTheDocument();
  });
  it('renders login and create-user navigation buttons', () => {
    render(<RootPage />);

    // Look for buttons instead of links since they're inside the MUI button component
    const loginButton = screen.getByRole('button', { name: /log_in/i });
    const signUpButton = screen.getByRole('button', { name: /sign_up/i });

    expect(loginButton).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();

    // Check the parent link elements
    const loginLink = loginButton.closest('a');
    const signUpLink = signUpButton.closest('a');
    
    expect(loginLink).toHaveAttribute('href', '/login');
    expect(signUpLink).toHaveAttribute('href', '/create-user');
  });

  it('navigates to login page when login button is clicked', async () => {
    render(<RootPage />);
    
    // Check if butotn exists, fire userEvent, check loginLink, expect the attribute of href, check if pages change
    // I can't figure out how to check the links
    const loginButton = screen.getByRole('button', { name: /log_in/i });
    await userEvent.click(loginButton);

    // Little magic below checks if it's a link 
    // <a> is hyperlink element attribute </a>
    const loginLink = loginButton.closest('a');
    expect(loginLink).toHaveAttribute('href', '/login');

    await waitFor(() => {
      expect(screen.getByText(/changing_pages/i)).toBeInTheDocument();
    });
  });

  it('navigates to create-user page when sign up button is clicked', async () => {
    render(<RootPage />);

    // Same as above
    // Still can't get the link search to work
    const signUpButton = screen.getByRole('button', { name: /sign_up/i });
    await userEvent.click(signUpButton);
    const signUpLink = signUpButton.closest('a');
    expect(signUpLink).toHaveAttribute('href', '/create-user');
    await waitFor(() => {
      expect(screen.getByText(/changing_pages/i)).toBeInTheDocument();
    });
  });
});
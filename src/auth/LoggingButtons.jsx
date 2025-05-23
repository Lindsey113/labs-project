/**
 * TODO: Ticket 3:
 * Implement authentication and logging functionality using Auth0
 */
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const LoggingButtons = () => {
  // TODO: Replace these with Auth0 functionality
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0()

  const handleLogging = () => {

    if (isAuthenticated) {
      logout({ returnTo: window.location.main })
    } else {
      loginWithRedirect()
    }
  }

  const buttonText = isAuthenticated ? 'Log Out' : 'Log In';

  return (
    <button className='nav-btn px-4 py-1' onClick={handleLogging}>
      {buttonText}
    </button>
  );
};
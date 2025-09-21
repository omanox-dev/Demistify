import React, { useState } from 'react';
import HomePage from './HomePage';
import Analyzer from './Analyzer';
import Summary from './Summary';
import Reports from './Reports';
import Auth from './Auth';
import TLDR from './TLDR';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';

export default function App() {
  const [page, setPage] = useState('home');
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [authMode, setAuthMode] = useState('login');
  const [pendingPage, setPendingPage] = useState(null); // for redirect after login

  const handleAuth = (jwt) => {
    setToken(jwt);
    localStorage.setItem('token', jwt);
    if (pendingPage) {
      setPage(pendingPage);
      setPendingPage(null);
    } else {
      setPage('home');
    }
  };
  
  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    setPage('home');
  };

  // Navigation handler that checks auth for protected pages
  const handleNavigate = (nextPage) => {
    if ((nextPage === 'analyzer' || nextPage === 'summary' || nextPage === 'reports') && !token) {
      setPendingPage(nextPage);
      setAuthMode('login');
      setPage('auth');
    } else {
      setPage(nextPage);
    }
  };

  let content;
  if (page === 'tldr') content = <TLDR onNavigate={handleNavigate} token={token} onLogout={handleLogout} />;
  else if (page === 'analyzer') content = <Analyzer onNavigate={handleNavigate} token={token} onLogout={handleLogout} />;
  else if (page === 'summary') content = <Summary onNavigate={handleNavigate} token={token} onLogout={handleLogout} />;
  else if (page === 'reports') content = <Reports onNavigate={handleNavigate} token={token} onLogout={handleLogout} />;
  else if (page === 'auth') content = (
    <Auth
      mode={authMode}
      onAuth={handleAuth}
      onSwitchMode={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
    />
  );
  else content = <HomePage onNavigate={handleNavigate} token={token} onLogout={handleLogout} />;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {content}
    </ThemeProvider>
  );
}

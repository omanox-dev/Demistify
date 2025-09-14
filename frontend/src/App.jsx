



import React, { useState } from 'react';
import HomePage from './HomePage';
import Analyzer from './Analyzer';
import Summary from './Summary';
import Reports from './Reports';
import Auth from './Auth';
import { CssBaseline, AppBar, Toolbar, Typography, Button } from '@mui/material';

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
  if (page === 'analyzer') content = <Analyzer onNavigate={handleNavigate} token={token} onLogout={handleLogout} />;
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
    <>
      <CssBaseline />
      <AppBar position="static" color="primary" elevation={2}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, cursor: 'pointer' }} onClick={() => handleNavigate('home')}>
            Demystify
          </Typography>
          <Button color="inherit" onClick={() => handleNavigate('analyzer')}>Analyzer</Button>
          <Button color="inherit" onClick={() => handleNavigate('summary')}>Summary Generator</Button>
          <Button color="inherit" onClick={() => handleNavigate('reports')}>User Reports</Button>
          {token ? (
            <Button color="inherit" onClick={handleLogout} sx={{ ml: 2 }}>
              Logout
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => { setAuthMode('login'); setPage('auth'); }}
              sx={{ ml: 2, fontWeight: 700 }}
            >
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {content}
    </>
  );
}

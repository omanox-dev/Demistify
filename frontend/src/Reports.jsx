
import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Reports({ onNavigate }) {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('demystify_reports') || '[]');
    setReports(data);
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', width: '100vw', background: 'linear-gradient(135deg, #e0e7ff 0%, #f1f5f9 100%)', py: 6, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      <Box sx={{
        width: '100%',
        maxWidth: 600,
        background: 'rgba(255,255,255,0.97)',
        borderRadius: 4,
        boxShadow: 4,
        p: { xs: 2, md: 6 },
        m: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', mb: 1 }}>
          <IconButton aria-label="Back to Home" onClick={() => onNavigate('home')} size="large" sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" fontWeight={700} align="left" sx={{ flexGrow: 1 }}>
            User Reports
          </Typography>
        </Box>
        <Typography align="center" color="text.secondary" gutterBottom sx={{ maxWidth: 700 }}>
          View your past analyses and summaries here.
        </Typography>
        <Box sx={{ mt: 4, p: 2, minHeight: 200, width: '100%', maxWidth: 700, background: '#f8fafc', borderRadius: 2, boxShadow: 1 }}>
          {reports.length === 0 ? (
            <Typography align="center" color="text.secondary">No reports yet.</Typography>
          ) : (
            <List>
              {reports.map((r, i) => (
                <ListItem key={i} alignItems="flex-start">
                  <ListItemText
                    primary={<b>Summary:</b>}
                    secondary={<span style={{ whiteSpace: 'pre-line' }}>{r.summary}</span>}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Box>
    </Box>
  );
}

import React, { useEffect, useState } from 'react';
import {
  Box, Typography, IconButton, Paper, Grid, Card, CardContent, Chip, Divider, Tooltip, Avatar, Tabs, Tab, AppBar, Toolbar, Button
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Summarize as SummarizeIcon,
  Speed as SpeedIcon,
  Analytics as AnalyticsIcon,
  Psychology as PsychologyIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

function formatDate(ts) {
  const d = new Date(ts);
  return d.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
}

export default function Reports({ onNavigate }) {
  const [reports, setReports] = useState([]);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('demystify_reports') || '[]');
    setReports(data);
  }, []);

  // Analytics
  const total = reports.length;
  const tldrCount = reports.filter(r => r.type === 'TLDR').length;
  const summaryCount = reports.filter(r => r.type === 'Summary').length;
  const clauseCount = reports.filter(r => Array.isArray(r.clauses) && r.clauses.length > 0).length;
  const recent = reports[0];

  const handleDelete = (idx) => {
    const newReports = reports.slice();
    newReports.splice(idx, 1);
    setReports(newReports);
    localStorage.setItem('demystify_reports', JSON.stringify(newReports));
  };

  return (
    <Box sx={{ minHeight: '100vh', width: '100vw', backgroundColor: '#f9fafb', py: 0 }}>
      {/* AppBar Header */}
      <AppBar position="static" elevation={0} sx={{ borderRadius: 0 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: { xs: 2, md: 6 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography 
              variant="h5" 
              fontWeight={700} 
              sx={{ letterSpacing: 1, color: '#fff', display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <SummarizeIcon sx={{ mr: 1 }} />
              Demistify Legal
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button 
              color="inherit" 
              onClick={() => onNavigate('home')} 
              sx={{ fontWeight: 600, background: 'rgba(255,255,255,0.12)', color: '#fff', borderRadius: 2, px: 3, py: 1, textTransform: 'none', '&:hover': { background: 'rgba(255,255,255,0.22)', color: '#fff' } }}
            >
              Home
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ maxWidth: 1000, mx: 'auto', p: { xs: 2, md: 4 } }}>
        <Paper elevation={3} sx={{ p: { xs: 2, md: 5 }, borderRadius: 4 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconButton aria-label="Back to Home" onClick={() => onNavigate('home')} size="large" sx={{ mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" fontWeight={700} sx={{ flexGrow: 1 }}>
              Dashboard & Reports
            </Typography>
          </Box>
          <Divider sx={{ mb: 3 }} />

          {/* Analytics */}
          <Grid container spacing={3} sx={{ mb: 4, justifyContent: 'center' }}>
            <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Card sx={{ p: 2, borderRadius: 3, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <CardContent>
                  <Avatar sx={{ bgcolor: '#3b82f6', mb: 2 }}><AnalyticsIcon /></Avatar>
                  <Typography variant="h6" fontWeight={600}>Total Analyses</Typography>
                  <Typography variant="h4" fontWeight={700}>{total}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Card sx={{ p: 2, borderRadius: 3, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <CardContent>
                  <Avatar sx={{ bgcolor: '#f59e0b', mb: 2 }}><SpeedIcon /></Avatar>
                  <Typography variant="h6" fontWeight={600}>TL;DRs</Typography>
                  <Typography variant="h4" fontWeight={700}>{tldrCount}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Card sx={{ p: 2, borderRadius: 3, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <CardContent>
                  <Avatar sx={{ bgcolor: '#0ea5e9', mb: 2 }}><SummarizeIcon /></Avatar>
                  <Typography variant="h6" fontWeight={600}>Summaries</Typography>
                  <Typography variant="h4" fontWeight={700}>{summaryCount}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Card sx={{ p: 2, borderRadius: 3, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <CardContent>
                  <Avatar sx={{ bgcolor: '#10b981', mb: 2 }}><PsychologyIcon /></Avatar>
                  <Typography variant="h6" fontWeight={600}>Clause Analyses</Typography>
                  <Typography variant="h4" fontWeight={700}>{clauseCount}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Tabs for report types */}
          <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 3 }}>
            <Tab label="All" />
            <Tab label="TL;DR" />
            <Tab label="Summary" />
            <Tab label="Clause Analysis" />
          </Tabs>

          {/* Reports List */}
          <Box sx={{ minHeight: 200 }}>
            {reports.length === 0 ? (
              <Typography align="center" color="text.secondary">No reports yet.</Typography>
            ) : (
              reports
                .filter((r) => {
                  if (tab === 1) return r.type === 'TLDR';
                  if (tab === 2) return r.type === 'Summary';
                  if (tab === 3) return Array.isArray(r.clauses) && r.clauses.length > 0;
                  return true;
                })
                .map((r, i) => (
                  <Card key={i} sx={{ mb: 3, borderRadius: 3, boxShadow: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Chip
                          icon={r.type === 'TLDR' ? <SpeedIcon /> : r.type === 'Summary' ? <SummarizeIcon /> : <AnalyticsIcon />}
                          label={r.type || (r.clauses ? 'Clause Analysis' : 'Unknown')}
                          color={r.type === 'TLDR' ? 'warning' : r.type === 'Summary' ? 'info' : 'success'}
                          sx={{ mr: 2 }}
                        />
                        <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                          {formatDate(r.ts)}
                        </Typography>
                        <Tooltip title="Delete Report">
                          <IconButton color="error" onClick={() => handleDelete(i)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      {r.summary && (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>Summary:</Typography>
                          <Typography variant="body1" sx={{ whiteSpace: 'pre-line', lineHeight: 1.7 }}>{r.summary}</Typography>
                        </Box>
                      )}
                      {r.simplified && (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>Simplified:</Typography>
                          <Typography variant="body1" sx={{ whiteSpace: 'pre-line', lineHeight: 1.7 }}>{r.simplified}</Typography>
                        </Box>
                      )}
                      {Array.isArray(r.clauses) && r.clauses.length > 0 && (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>Clause Breakdown:</Typography>
                          {r.clauses.map((clause, idx) => (
                            <Paper key={idx} sx={{ p: 2, mb: 1, borderRadius: 2, backgroundColor: '#f1f5f9' }}>
                              <Typography variant="body2" fontWeight={600}>Clause {idx + 1}:</Typography>
                              <Typography variant="body2" sx={{ mb: 1 }}>{clause.clause}</Typography>
                              <Chip label={clause.risk} size="small" sx={{ mr: 1 }} />
                              <Typography variant="caption" color="text.secondary">{clause.ai_explanation}</Typography>
                            </Paper>
                          ))}
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                ))
            )}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

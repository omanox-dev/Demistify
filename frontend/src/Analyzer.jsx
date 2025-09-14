
import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Alert, CircularProgress, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Analyzer({ token, onNavigate, onLogout }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setText("");
    setResult(null);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    setFile(null);
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      let docText = text;
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        const uploadRes = await fetch('http://localhost:8000/upload', {
          method: 'POST',
          body: formData,
          headers: { Authorization: `Bearer ${token}` },
        });
        const uploadData = await uploadRes.json();
        docText = uploadData.filename;
      }
      const simplifyForm = new FormData();
      simplifyForm.append('text', docText);
      const simplifyRes = await fetch('http://localhost:8000/simplify', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: simplifyForm,
      });
      if (simplifyRes.status === 401) {
        onLogout();
        return;
      }
      const simplifyData = await simplifyRes.json();
  setResult(simplifyData);
  // Save to localStorage for reports
  const reports = JSON.parse(localStorage.getItem('demystify_reports') || '[]');
  reports.unshift({ summary: simplifyData.summary, simplified: simplifyData.simplified, ts: Date.now() });
  localStorage.setItem('demystify_reports', JSON.stringify(reports.slice(0, 20)));
    } catch (err) {
      setError('Error processing document.');
    }
    setLoading(false);
  };

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
            Document Analyzer
          </Typography>
        </Box>
        <Typography align="center" color="text.secondary" gutterBottom sx={{ maxWidth: 700 }}>
          Upload or paste your legal document to analyze and simplify it using AI.
        </Typography>
        <form onSubmit={handleSubmit} style={{ marginTop: 24, width: '100%', maxWidth: 700 }}>
          <TextField
            label="Paste Legal Document Text"
            value={text}
            onChange={handleTextChange}
            multiline
            rows={6}
            fullWidth
            margin="normal"
            disabled={!!file}
          />
          <Typography align="center" color="text.secondary" sx={{ my: 1 }}>or</Typography>
          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{ mb: 2 }}
            disabled={!!text}
          >
            Upload File
            <input type="file" accept=".txt,.pdf,.doc,.docx" hidden onChange={handleFileChange} />
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading || (!text && !file)}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Analyze & Simplify'}
          </Button>
        </form>
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {result && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" fontWeight={600}>Simplified Text</Typography>
            <Paper sx={{ p: 2, mt: 1, mb: 2, background: '#f8fafc' }}>{result.simplified}</Paper>
            <Typography variant="h6" fontWeight={600}>Summary</Typography>
            <Paper sx={{ p: 2, mt: 1, background: '#f8fafc' }}>{result.summary}</Paper>
          </Box>
        )}
      </Box>
    </Box>
  );
}

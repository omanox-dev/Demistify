import React from 'react';
import { Box, Container, Card, CardContent, Typography } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import SummarizeIcon from '@mui/icons-material/Summarize';
import AssessmentIcon from '@mui/icons-material/Assessment';

export default function HomePage({ onNavigate, token, onLogout }) {
  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0e7ff 0%, #f1f5f9 100%)' }}>
  <Container maxWidth={false} sx={{ pt: { xs: 4, md: 6 }, px: { xs: 0, md: 4 } }}>
        <Typography variant="h3" align="center" fontWeight={700} gutterBottom>
          Welcome to Demystify
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" gutterBottom>
          AI-Powered Legal Document Simplifier for Everyone
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            mt: 4,
            alignItems: 'stretch',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '1800px',
            mx: 'auto',
          }}
        >
          {[
            {
              icon: <DescriptionIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />, 
              title: 'Upload & Analyze',
              desc: 'Upload or paste any legal document. Our AI will break down complex language into plain English.',
              nav: 'analyzer',
            },
            {
              icon: <SummarizeIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />, 
              title: 'Summary Generator',
              desc: 'Instantly get concise summaries and key points from your legal documents.',
              nav: 'summary',
            },
            {
              icon: <AssessmentIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />, 
              title: 'User Reports',
              desc: 'View your past analyses and summaries in one place for easy reference.',
              nav: 'reports',
            },
          ].map((card, i) => (
            <Box
              key={i}
              onClick={() => onNavigate(card.nav)}
              sx={{
                flex: '1 1 340px',
                minWidth: 'clamp(320px, 30vw, 500px)',
                maxWidth: '500px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 0,
                cursor: 'pointer',
                borderRadius: 3,
                boxShadow: 3,
                height: '100%',
                transition: 'transform 0.18s cubic-bezier(.4,2,.6,1), box-shadow 0.18s cubic-bezier(.4,2,.6,1)',
                '&:hover': {
                  transform: 'scale(1.035)',
                  boxShadow: 8,
                  background: 'rgba(99,102,241,0.07)',
                },
                outline: 'none',
              }}
              tabIndex={0}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onNavigate(card.nav); }}
            >
              <Card elevation={0} sx={{ boxShadow: 'none', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3, background: 'none', height: '100%' }}>
                {card.icon}
                <CardContent sx={{ flex: 1, width: '100%' }}>
                  <Typography variant="h6" align="center">{card.title}</Typography>
                  <Typography align="center" color="text.secondary">
                    {card.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
      <Box sx={{ textAlign: 'center', color: '#64748b', py: 4, mt: 8 }}>
        &copy; {new Date().getFullYear()} Demystify &mdash; Google Gen AI Hackathon Project
      </Box>
    </Box>
  );
}

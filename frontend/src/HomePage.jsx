import React from 'react';
import { 
  Box, Container, Typography, Button, AppBar, Toolbar, Stack, 
  useMediaQuery, Card, CardContent, Grid, Chip, Avatar,
  Divider, List, ListItem, ListItemIcon, ListItemText,
  Paper
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  Gavel as GavelIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Insights as InsightsIcon,
  CheckCircle as CheckIcon,
  TrendingUp as TrendingUpIcon,
  Shield as ShieldIcon,
  AutoAwesome as AutoAwesomeIcon,
  DocumentScanner as DocumentIcon,
  Analytics as AnalyticsIcon,
  Psychology as PsychologyIcon
} from '@mui/icons-material';

export default function HomePage({ onNavigate, token, onLogout }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const features = [
    {
      icon: <AutoAwesomeIcon sx={{ fontSize: 40, color: theme.palette.secondary.main }} />,
      title: "AI-Powered Analysis",
      description: "Advanced AI breaks down complex legal jargon into plain English"
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: theme.palette.error.main }} />,
      title: "Risk Detection",
      description: "Automatically identifies potential risks and concerning clauses"
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40, color: theme.palette.success.main }} />,
      title: "Instant Results",
      description: "Get comprehensive analysis in seconds, not hours"
    },
    {
      icon: <InsightsIcon sx={{ fontSize: 40, color: theme.palette.info.main }} />,
      title: "Smart Insights",
      description: "Actionable recommendations and clause-by-clause breakdown"
    }
  ];

  const analysisTypes = [
    {
      title: "TL;DR",
      description: "Quick summary of the most important points",
      icon: <SpeedIcon />,
      color: theme.palette.secondary.main,
      route: 'tldr'
    },
    {
      title: "Plain Summary",
      description: "Comprehensive breakdown in simple language",
      icon: <DocumentIcon />,
      color: theme.palette.info.main,
      route: 'summary'
    },
    {
      title: "Clause-by-Clause",
      description: "Detailed analysis with risk assessment for each section",
      icon: <AnalyticsIcon />,
      color: theme.palette.primary.main,
      route: 'analyzer'
    }
  ];

  const benefits = [
    "Save hours of legal research time",
    "Understand contracts before signing",
    "Identify hidden risks and obligations",
    "Make informed business decisions",
    "Reduce legal consultation costs"
  ];

  const stats = [
    { number: "10,000+", label: "Documents Analyzed" },
    { number: "95%", label: "Accuracy Rate" },
    { number: "2 min", label: "Average Analysis Time" },
    { number: "500+", label: "Happy Users" }
  ];

  return (
    <Box sx={{ minHeight: '100vh', width: '100vw' }}>
      {/* Navigation Header */}
      <AppBar position="static" elevation={0} sx={{ 
        background: 'linear-gradient(135deg, #1a2332 0%, #3b82f6 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 0
      }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', py: 1, px: { xs: 2, md: 6 } }}>
          <Typography 
            variant="h5" 
            fontWeight={700} 
            sx={{ 
              letterSpacing: 1, 
              color: '#fff', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }} 
            onClick={() => onNavigate('home')}
          >
            <GavelIcon sx={{ mr: 1 }} />
            Demystify Legal
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button 
              color="inherit" 
              onClick={() => onNavigate('reports')} 
              sx={{ 
                fontWeight: 600, 
                display: { xs: 'none', sm: 'block' },
                background: 'rgba(255,255,255,0.12)',
                color: '#fff',
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(59,130,246,0.08)',
                px: 3,
                py: 1,
                textTransform: 'none',
                '&:hover': {
                  background: 'rgba(255,255,255,0.22)',
                  color: '#fff',
                  boxShadow: '0 4px 16px rgba(59,130,246,0.16)'
                }
              }}
            >
              Reports
            </Button>
            {token ? (
              <Button 
                color="inherit" 
                onClick={onLogout} 
                sx={{ 
                  fontWeight: 600,
                  background: 'rgba(255,255,255,0.12)',
                  color: '#fff',
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(59,130,246,0.08)',
                  px: 3,
                  py: 1,
                  textTransform: 'none',
                  '&:hover': {
                    background: 'rgba(255,255,255,0.22)',
                    color: '#fff',
                    boxShadow: '0 4px 16px rgba(59,130,246,0.16)'
                  }
                }}
              >
                Logout
              </Button>
            ) : (
              <Button 
                variant="contained" 
                sx={{ 
                  backgroundColor: theme.palette.secondary.main,
                  color: '#fff',
                  fontWeight: 700,
                  '&:hover': { backgroundColor: theme.palette.secondary.dark, color: '#fff' }
                }} 
                onClick={() => onNavigate('auth')}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section - Full Width */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #1a2332 0%, #3b82f6 100%)',
        color: 'white',
        pt: { xs: 6, md: 12 },
        pb: { xs: 8, md: 16 },
        position: 'relative',
        overflow: 'hidden',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)'
      }}>
        {/* Background Pattern */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: 'radial-gradient(circle at 25% 25%, #d4af37 0%, transparent 50%), radial-gradient(circle at 75% 75%, #3b82f6 0%, transparent 50%)',
        }} />
        <Container maxWidth={false} sx={{ position: 'relative', zIndex: 1, px: { xs: 2, md: 8 } }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h2" 
                fontWeight={700} 
                gutterBottom 
                sx={{ 
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.1,
                  mb: 3
                }}
              >
                Transform Legal Documents into 
                <Box component="span" sx={{ color: theme.palette.secondary.main, display: 'block' }}>
                  Clear Insights
                </Box>
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 4, 
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: '1.2rem',
                  lineHeight: 1.6,
                  maxWidth: '500px'
                }}
              >
                AI-powered legal document analysis that detects risks, explains complex terms, and provides actionable guidance in seconds.
              </Typography>
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={2} 
                sx={{ mb: 4 }}
              >
                <Button 
                  variant="contained" 
                  size="large" 
                  onClick={() => onNavigate('analyzer')}
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                    color: '#fff', // White text for maximum contrast
                    borderRadius: 3,
                    fontWeight: 700,
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    boxShadow: '0 8px 32px rgba(212, 175, 55, 0.3)',
                    '&:hover': { 
                      backgroundColor: theme.palette.secondary.dark,
                      color: '#fff', // White text on hover
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 40px rgba(212, 175, 55, 0.4)'
                    }
                  }}
                >
                  Start Analysis
                </Button>
                <Button 
                  variant="outlined" 
                  size="large" 
                  onClick={() => onNavigate('tldr')}
                  sx={{
                    borderColor: 'rgba(255,255,255,0.5)',
                    color: 'white',
                    borderRadius: 3,
                    fontWeight: 600,
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    borderWidth: '2px',
                    '&:hover': { 
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      borderWidth: '2px'
                    }
                  }}
                >
                  Try TL;DR
                </Button>
              </Stack>
              
              {/* Trust Indicators */}
              <Stack direction="row" spacing={4} sx={{ mt: 6 }}>
                {stats.map((stat, index) => (
                  <Box key={index} sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" fontWeight={700} sx={{ color: theme.palette.secondary.main }}>
                      {stat.number}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section - Full Width */}
      <Box sx={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', backgroundColor: theme.palette.grey[50], py: { xs: 8, md: 12 } }}>
        <Container maxWidth={false} sx={{ px: { xs: 2, md: 8 } }}>
          <Typography 
            variant="h3" 
            fontWeight={700} 
            align="center" 
            gutterBottom 
            sx={{ 
              color: theme.palette.primary.main,
              mb: 2
            }}
          >
            Why Choose Demystify?
          </Typography>
          <Typography 
            variant="h6" 
            align="center" 
            color="text.secondary" 
            sx={{ mb: 8, maxWidth: '600px', mx: 'auto' }}
          >
            Our AI-powered platform makes legal documents accessible to everyone, regardless of legal background.
          </Typography>
          <Grid container spacing={4} justifyContent="center" alignItems="center">
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Card sx={{ 
                  height: '100%', 
                  textAlign: 'center',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.shadows[8]
                  }
                }}>
                  <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={{ mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Analysis Types Section - Full Width */}
      <Box sx={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', backgroundColor: theme.palette.grey[50], py: { xs: 8, md: 12 } }}>
        <Container maxWidth={false} sx={{ px: { xs: 2, md: 8 } }}>
          <Typography 
            variant="h3" 
            fontWeight={700} 
            align="center" 
            gutterBottom 
            sx={{ 
              color: theme.palette.primary.main,
              mb: 2
            }}
          >
            Choose Your Analysis Type
          </Typography>
          <Typography 
            variant="h6" 
            align="center" 
            color="text.secondary" 
            sx={{ mb: 8, maxWidth: '600px', mx: 'auto' }}
          >
            Different analysis modes for different needs - from quick summaries to detailed clause-by-clause breakdowns.
          </Typography>
          <Grid container spacing={4} justifyContent="center" alignItems="center">
            {analysisTypes.map((type, index) => (
              <Grid item xs={12} md={4} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Card sx={{ 
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: '2px solid transparent',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    borderColor: type.color,
                    boxShadow: `0 12px 40px ${type.color}20`
                  }
                }}>
                  <CardContent sx={{ p: 4, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Avatar sx={{ 
                      backgroundColor: `${type.color}15`, 
                      color: type.color,
                      width: 64,
                      height: 64,
                      mx: 'auto',
                      mb: 3
                    }}>
                      {type.icon}
                    </Avatar>
                    <Typography variant="h5" fontWeight={600} gutterBottom>
                      {type.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                      {type.description}
                    </Typography>
                    <Button 
                      variant="contained" 
                      fullWidth
                      onClick={() => onNavigate(type.route)}
                      sx={{ 
                        backgroundColor: type.color,
                        color: '#fff',
                        '&:hover': { backgroundColor: `${type.color}dd`, color: '#fff' }
                      }}
                    >
                      Try {type.title}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Benefits Section - Full Width */}
      <Box sx={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', backgroundColor: theme.palette.grey[50], py: { xs: 8, md: 12 } }}>
        <Container maxWidth={false} sx={{ px: { xs: 2, md: 8 } }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'flex-start', justifyContent: 'center', gap: 6 }}>
            <Box sx={{ flex: 2 }}>
              <Typography 
                variant="h3" 
                fontWeight={700} 
                gutterBottom 
                sx={{ color: theme.palette.primary.main }}
              >
                Make Informed Decisions
              </Typography>
              <Typography 
                variant="h6" 
                color="text.secondary" 
                sx={{ mb: 4, lineHeight: 1.6 }}
              >
                Don't let complex legal language prevent you from understanding important documents. Our AI breaks down barriers between you and legal clarity.
              </Typography>
              <List>
                {benefits.map((benefit, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemIcon>
                      <CheckIcon sx={{ color: theme.palette.success.main }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={benefit}
                      primaryTypographyProps={{
                        fontSize: '1.1rem',
                        fontWeight: 500
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Paper sx={{
                p: 4,
                borderRadius: 4,
                background: 'linear-gradient(135deg, #fff 0%, #f8fafc 100%)',
                border: `2px solid ${theme.palette.secondary.main}`,
                boxShadow: '0 8px 32px rgba(59, 130, 246, 0.08)',
                maxWidth: 400,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%'
              }}>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 3, textAlign: 'center', color: theme.palette.secondary.main, letterSpacing: 1 }}>
                  🎯 Perfect For
                </Typography>
                <Stack spacing={2} sx={{ width: '100%', alignItems: 'center' }}>
                  {[
                    'Small Business Owners',
                    'Freelancers & Contractors',
                    'Real Estate Professionals',
                    'Startup Founders',
                    'Anyone signing contracts'
                  ].map((audience, index) => (
                    <Chip 
                      key={index}
                      label={audience}
                      variant="outlined"
                      sx={{ 
                        justifyContent: 'center', 
                        width: '90%', 
                        fontWeight: 600, 
                        fontSize: '1rem', 
                        color: theme.palette.primary.main,
                        borderColor: theme.palette.secondary.main,
                        background: '#fff',
                        boxShadow: '0 2px 8px rgba(59,130,246,0.06)',
                        transition: 'all 0.2s',
                        '&:hover': {
                          background: theme.palette.secondary.light,
                          color: '#fff',
                          borderColor: theme.palette.secondary.dark
                        }
                      }}
                    />
                  ))}
                </Stack>
              </Paper>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* CTA Section - Full Width */}
      <Box sx={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', background: 'linear-gradient(135deg, #1a2332 0%, #3b82f6 100%)', color: 'white', py: { xs: 8, md: 12 }, textAlign: 'center' }}>
        <Container maxWidth={false} sx={{ px: { xs: 2, md: 8 } }}>
          <Typography variant="h3" fontWeight={700} gutterBottom>
            Ready to Demystify Your Documents?
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 4, 
              color: 'rgba(255,255,255,0.9)',
              maxWidth: '500px',
              mx: 'auto'
            }}
          >
            Join thousands of users who trust Demystify to make sense of complex legal documents.
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            onClick={() => onNavigate('analyzer')}
            sx={{
              backgroundColor: theme.palette.secondary.main,
              color: '#fff', // White text for maximum contrast
              borderRadius: 3,
              fontWeight: 700,
              px: 6,
              py: 3,
              fontSize: '1.2rem',
              boxShadow: '0 8px 32px rgba(212, 175, 55, 0.3)',
              '&:hover': { 
                backgroundColor: theme.palette.secondary.dark,
                color: '#fff', // White text on hover
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 40px rgba(212, 175, 55, 0.4)'
              }
            }}
          >
            Get Started Now
          </Button>
        </Container>
      </Box>

      {/* Footer - Full Width */}
      <Box sx={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', backgroundColor: theme.palette.grey[900], color: 'white', py: 4, textAlign: 'center' }}>
        <Container maxWidth={false}>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © 2025 Demystify Legal. Making legal documents accessible to everyone.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

import React from "react";
import { 
  Typography, 
  Button, 
  Box, 
  Container, 
  Grid, 
  Paper, 
  Card, 
  CardContent,
  Divider,
  Avatar,
  ThemeProvider,
  createTheme,
  CssBaseline,
  useMediaQuery
} from "@mui/material";
import { Link } from "react-router-dom";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import WorkIcon from '@mui/icons-material/Work';
import SearchIcon from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/People';
import HandshakeIcon from '@mui/icons-material/Handshake';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
      light: '#6573c3',
      dark: '#2c387e',
    },
    secondary: {
      main: '#f50057',
      light: '#f73378',
      dark: '#ab003c',
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.5px',
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          fontSize: '1rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Developer",
    company: "TechCorp",
    content: "I found my dream job in just 2 weeks! The platform made it incredibly easy to connect with employers looking for my exact skill set.",
    avatar: "S",
    color: "#3f51b5"
  },
  {
    name: "Robert Chen",
    role: "HR Manager",
    company: "InnovateCo",
    content: "As a hiring manager, this platform has simplified our recruitment process. We've found amazing talent and reduced our hiring time by 40%.",
    avatar: "R",
    color: "#f50057"
  },
  {
    name: "Maya Patel",
    role: "UX Designer",
    company: "DesignHub",
    content: "The quality of job listings is exceptional. I appreciate how the platform matches me with positions that align perfectly with my career goals.",
    avatar: "M",
    color: "#00bcd4"
  }
];

const features = [
  {
    icon: <SearchIcon sx={{ fontSize: 40 }} />,
    title: "Smart Job Matching",
    description: "Our AI-powered algorithm matches your skills with the perfect job opportunities."
  },
  {
    icon: <PeopleIcon sx={{ fontSize: 40 }} />,
    title: "Talent Network",
    description: "Connect with thousands of qualified professionals or top companies in your industry."
  },
  {
    icon: <VerifiedUserIcon sx={{ fontSize: 40 }} />,
    title: "Verified Listings",
    description: "All job postings and candidate profiles are verified for quality and authenticity."
  }
];

const Home = () => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e6eeff 100%)',
        pb: 8
      }}>
        {/* Hero Section */}
        <Container maxWidth="lg">
          <Box 
            sx={{ 
              pt: { xs: 8, md: 10 },
              pb: { xs: 6, md: 10 },
              textAlign: 'center'
            }}
          >
            <Typography 
              variant={isSmallScreen ? "h3" : "h2"} 
              component="h1"
              sx={{ 
                mb: 2,
                background: 'linear-gradient(90deg, #3f51b5 0%, #f50057 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textFillColor: 'transparent'
              }}
            >
              Get Hired or Hire People for Free!
            </Typography>
            
            <Typography 
              variant="h5" 
              color="text.secondary" 
              sx={{ 
                mb: 6, 
                maxWidth: 700, 
                mx: 'auto',
                px: 2
              }}
            >
              Connect with top talent and opportunities in your industry. 
              Our platform makes hiring and job searching simple and effective.
            </Typography>
            
            <Grid container spacing={3} justifyContent="center">
              <Grid item>
                <Button 
                  variant="contained" 
                  size="large"
                  component={Link}
                  to="/employer/dashboard"
                  startIcon={<BusinessCenterIcon />}
                  sx={{ 
                    px: 4,
                    boxShadow: '0 8px 16px rgba(63, 81, 181, 0.2)',
                    '&:hover': {
                      boxShadow: '0 12px 20px rgba(63, 81, 181, 0.3)',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  Hire Talent
                </Button>
              </Grid>
              <Grid item>
                <Button 
                  variant="outlined" 
                  size="large"
                  component={Link}
                  to="/employee/feed"
                  startIcon={<WorkIcon />}
                  sx={{ 
                    px: 4,
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2,
                      boxShadow: '0 5px 10px rgba(0, 0, 0, 0.1)',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  Find Jobs
                </Button>
              </Grid>
            </Grid>
          </Box>
          
          {/* Stats Section */}
          <Paper 
            elevation={0}
            sx={{ 
              p: 3, 
              mb: 8, 
              borderRadius: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }}
          >
            <Grid container spacing={3} justifyContent="center" textAlign="center">
              <Grid item xs={12} sm={4}>
                <Typography variant="h3" color="primary" fontWeight="bold">10K+</Typography>
                <Typography variant="subtitle1">Active Jobs</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="h3" color="primary" fontWeight="bold">8K+</Typography>
                <Typography variant="subtitle1">Companies</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="h3" color="primary" fontWeight="bold">25K+</Typography>
                <Typography variant="subtitle1">Job Seekers</Typography>
              </Grid>
            </Grid>
          </Paper>
          
          {/* Features Section */}
          <Typography variant="h4" textAlign="center" sx={{ mb: 4 }}>
            Why Choose Our Platform
          </Typography>
          
          <Grid container spacing={4} sx={{ mb: 8 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'center',
                      mb: 2,
                      color: 'primary.main'
                    }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          {/* Testimonials */}
          <Typography variant="h4" textAlign="center" sx={{ mb: 4 }}>
            Success Stories
          </Typography>
          
          <Grid container spacing={4} sx={{ mb: 8 }}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic' }}>
                      "{testimonial.content}"
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ bgcolor: testimonial.color, mr: 2 }}>
                        {testimonial.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.role}, {testimonial.company}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          {/* CTA Section */}
          <Card sx={{ 
            p: { xs: 4, md: 6 }, 
            textAlign: 'center',
            background: 'linear-gradient(135deg, #3f51b5 0%, #2c387e 100%)',
            color: 'white',
          }}>
            <CardContent>
              <HandshakeIcon sx={{ fontSize: 60, mb: 2 }} />
              <Typography variant="h4" gutterBottom fontWeight="bold">
                Ready to Transform Your Career or Find Perfect Talent?
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                Join thousands of successful companies and professionals today.
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button 
                    variant="contained" 
                    size="large"
                    component={Link}
                    to="/employer/dashboard"
                    sx={{ 
                      bgcolor: 'white', 
                      color: 'primary.dark',
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.9)',
                      }
                    }}
                  >
                    Start Hiring
                  </Button>
                </Grid>
                <Grid item>
                  <Button 
                    variant="outlined" 
                    size="large"
                    component={Link}
                    to="/employee/feed"
                    sx={{ 
                      color: 'white',
                      borderColor: 'white',
                      '&:hover': {
                        borderColor: 'white',
                        bgcolor: 'rgba(255,255,255,0.1)',
                      }
                    }}
                  >
                    Browse Jobs
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
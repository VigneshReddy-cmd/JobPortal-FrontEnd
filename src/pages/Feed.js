import {
  Box,
  Card,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  Button,
  Container,
  AppBar,
  Toolbar,
  Chip,
  IconButton,
  Avatar,
  Paper,
  Divider,
  CardContent,
  useTheme,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Fade
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import WorkIcon from "@mui/icons-material/Work";
import HomeIcon from "@mui/icons-material/Home";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CodeIcon from "@mui/icons-material/Code";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { Link } from "react-router-dom";

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
    text: {
      primary: '#333333',
      secondary: '#6b778c',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
    subtitle1: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
        },
      },
    },
  },
});

const Feed = () => {
  const [query, setQuery] = useState("");
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://jobportal-backend-latest.onrender.com/post/${query}`);
        console.log("HIT FOR POST" + response);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchInitialPosts = async () => {
      setLoading(true);
      try {
        console.log("HIT FOR ALL POSTS");
        const response = await axios.get(`https://jobportal-backend-latest.onrender.com/allPosts`);
        console.log("HIT FOR POST" + response);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching all posts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query.length === 0) fetchInitialPosts();
    if (query.length > 2) fetchPosts();
  }, [query]);

  console.log(post);

  // Generate a random color for skill chips
  const getRandomColor = (index) => {
    const colors = ['primary', 'secondary', 'error', 'warning', 'info', 'success'];
    return colors[index % colors.length];
  };

  // Generate random logos for each job card
  const getCompanyLogo = (profile) => {
    // Hash the profile name to get consistent but random letters
    const letters = profile.substring(0, 2).toUpperCase();
    const hash = profile.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const bgColor = `hsl(${hash % 360}, 70%, 65%)`;
    
    return { letters, bgColor };
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, background: 'linear-gradient(180deg, #f0f4ff 0%, #f5f7fa 100%)' }}>
        <AppBar position="static" color="default" elevation={3} sx={{ borderRadius: { sm: '0 0 16px 16px' } }}>
          <Toolbar>
            <BusinessCenterIcon sx={{ mr: 2, color: 'primary.main' }} />
            <Typography variant="h5" component="div" sx={{ flexGrow: 1, color: 'primary.main' }}>
              Job Board
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<HomeIcon />} 
              component={Link} 
              to="/"
              sx={{ 
                boxShadow: 2,
                '&:hover': {
                  boxShadow: 4,
                }
              }}
            >
              Home
            </Button>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl">
          <Fade in={true} timeout={600}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: 2, 
                mt: 3, 
                mb: 3, 
                borderRadius: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              }}
            >
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="primary" />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 3, py: 0.5 }
                }}
                placeholder="Search jobs by title, skills or description..."
                fullWidth
                onChange={(e) => setQuery(e.target.value)}
                variant="outlined"
              />
            </Paper>
          </Fade>

          <Typography variant="h5" sx={{ my: 3, fontWeight: 600 }}>
            {query.length > 0 ? `Search Results for "${query}"` : "Available Opportunities"}
          </Typography>

          <Grid container spacing={3}>
            {loading ? (
              Array(6).fill(0).map((_, index) => (
                <Grid key={index} item xs={12} md={6} lg={4}>
                  <Card sx={{ height: '270px', opacity: 0.7 }}>
                    <CardContent sx={{ height: '100%', bgcolor: '#f9f9f9' }}></CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              post && post.map((p) => {
                const logo = getCompanyLogo(p.profile);
                return (
                  <Grid key={p.id} item xs={12} md={6} lg={4}>
                    <Fade in={true} timeout={800}>
                      <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ p: 3, flexGrow: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                            <Avatar
                              sx={{
                                bgcolor: logo.bgColor,
                                width: 56,
                                height: 56,
                                mr: 2
                              }}
                            >
                              {logo.letters}
                            </Avatar>
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5, lineHeight: 1.3 }}>
                                {p.profile}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <EventAvailableIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                                <Typography variant="body2" color="text.secondary">
                                  {p.exp} {p.exp === 1 ? 'year' : 'years'} experience
                                </Typography>
                              </Box>
                            </Box>
                          </Box>

                          <Typography 
                            variant="body1" 
                            color="text.secondary" 
                            sx={{ 
                              mb: 2,
                              display: '-webkit-box',
                              overflow: 'hidden',
                              WebkitBoxOrient: 'vertical',
                              WebkitLineClamp: 3,
                            }}
                          >
                            {p.desc}
                          </Typography>
                          
                          <Divider sx={{ my: 2 }} />
                          
                          <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                            <CodeIcon sx={{ fontSize: 18, mr: 0.5 }} /> Required Skills:
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {p.techs.map((skill, i) => (
                              <Chip
                                key={i}
                                label={skill}
                                size="small"
                                color={getRandomColor(i)}
                                variant="outlined"
                              />
                            ))}
                          </Box>
                        </CardContent>
                        <Box sx={{ p: 2, pt: 0 }}>
                          <Button 
                            variant="outlined" 
                            fullWidth
                            sx={{ 
                              borderRadius: 2,
                              '&:hover': { backgroundColor: 'primary.light', color: 'white' }
                            }}
                          >
                            Apply Now
                          </Button>
                        </Box>
                      </Card>
                    </Fade>
                  </Grid>
                );
              })
            )}
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Feed;
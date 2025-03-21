import * as React from 'react';
import { 
  Box, 
  Tab, 
  Typography, 
  Button, 
  Paper, 
  Container, 
  AppBar, 
  Toolbar,
  useTheme,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Fade,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  IconButton,
  Badge,
  Menu,
  Divider,
  ListItemIcon,
  ListItemText,
  Switch,
  FormControlLabel,
  Tooltip,
  Alert,
  Snackbar,
  Checkbox
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Link } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import FormGroup from '@mui/material/FormGroup';
import { useNavigate } from "react-router-dom";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#3f51b5' : '#7986cb',
    },
    secondary: {
      main: mode === 'light' ? '#f50057' : '#ff4081',
    },
    background: {
      default: mode === 'light' ? '#f5f5f5' : '#121212',
      paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h3: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          minWidth: 120,
          '&.Mui-selected': {
            backgroundColor: mode === 'light' ? 'rgba(63, 81, 181, 0.08)' : 'rgba(121, 134, 203, 0.15)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});

// Mock data for dropdowns and options
const jobCategories = [
  'Information Technology', 
  'Engineering', 
  'Marketing', 
  'Sales', 
  'Finance', 
  'Human Resources',
  'Healthcare',
  'Education',
  'Design',
  'Customer Service'
];

const experienceLevels = [
  'Entry Level',
  'Mid Level',
  'Senior Level',
  'Manager',
  'Director',
  'Executive'
];

const employmentTypes = [
  'Full-time',
  'Part-time',
  'Contract',
  'Temporary',
  'Internship',
  'Remote'
];

const locations = [
  'New York',
  'San Francisco',
  'Chicago',
  'Los Angeles',
  'Seattle',
  'Boston',
  'Austin',
  'Remote'
];

const skillSet = [
  { name: "Javascript" },
  { name: "Java" },
  { name: "Python" },
  { name: "Django" },
  { name: "Rust" },
  { name: "React" },
  { name: "Node.js" },
  { name: "Angular" },
  { name: "Vue.js" },
  { name: "MongoDB" },
  { name: "SQL" },
  { name: "AWS" },
  { name: "Docker" },
  { name: "Git" }
];

const mockNotifications = [
  { id: 1, message: 'New application received', read: false },
  { id: 2, message: 'Interview scheduled for tomorrow', read: false },
  { id: 3, message: 'Candidate accepted your offer', read: true }
];

// Original Create component modified to integrate with dashboard
const CustomJobPostForm = ({ showSnackbar }) => {
  const navigate = useNavigate();
  
  const initial = { 
    profile: "Frontend Developer", 
    exp: 1, 
    techs: [], 
    desc: "Front-end web development is the development of the graphical user interface of a website, through the use of HTML, CSS, and JavaScript, so that users can view and interact with that website." 
  };

  const [form, setForm] = React.useState(initial);
  const { profile, exp, desc } = form;

  const handleChange = (e) => {
    if (e.target.checked) {
      setForm({ ...form, techs: [...form.techs, e.target.value] });
    } else {
      setForm({
        ...form,
        techs: form.techs.filter(tech => tech !== e.target.value)
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!profile || !desc || form.techs.length === 0) {
      showSnackbar('Please fill in all required fields', 'error');
      return;
    }
    
    fetch("https://jobportal-backend-latest.onrender.com/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        showSnackbar('Job post created successfully!', 'success');
        setForm(initial);
        // navigate('/employee/feed'); // Commented out to stay on dashboard
      })
      .catch((error) => {
        console.error("Error:", error);
        showSnackbar('Error creating job post', 'error');
      });
  };

  const handleReset = () => {
    setForm(initial);
    showSnackbar('Form reset successfully', 'info');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
            Create New Job Post
          </Typography>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            label="Job Profile"
            fullWidth
            required
            value={form.profile}
            onChange={(e) => setForm({ ...form, profile: e.target.value })}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            label="Years of Experience"
            type="number"
            fullWidth
            required
            InputProps={{ inputProps: { min: 0 } }}
            value={form.exp}
            onChange={(e) => setForm({ ...form, exp: e.target.value })}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Job Category</InputLabel>
            <Select
              value={form.category || ''}
              label="Job Category"
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {jobCategories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Employment Type</InputLabel>
            <Select
              value={form.employmentType || ''}
              label="Employment Type"
              onChange={(e) => setForm({ ...form, employmentType: e.target.value })}
            >
              {employmentTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Location</InputLabel>
            <Select
              value={form.location || ''}
              label="Location"
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            >
              {locations.map((loc) => (
                <MenuItem key={loc} value={loc}>
                  {loc}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            label="Salary Range"
            fullWidth
            placeholder="e.g. $50,000 - $70,000"
            value={form.salary || ''}
            onChange={(e) => setForm({ ...form, salary: e.target.value })}
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            label="Job Description"
            fullWidth
            required
            multiline
            rows={4}
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
          />
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mb: 1 }}>Required Skills</Typography>
          <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <Grid container spacing={2}>
              {skillSet.map(({ name }, index) => (
                <Grid item xs={6} md={4} lg={3} key={index}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        id={`custom-checkbox-${index}`}
                        name={name}
                        value={name}
                        onChange={handleChange}
                        checked={form.techs.includes(name)}
                        color="primary"
                      />
                    }
                    label={name}
                  />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <FormControlLabel
            control={
              <Switch
                checked={form.featured || false}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                color="primary"
              />
            }
            label="Featured Post (Premium)"
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <FormControlLabel
            control={
              <Switch
                checked={form.urgent || false}
                onChange={(e) => setForm({ ...form, urgent: e.target.checked })}
                color="secondary"
              />
            }
            label="Urgent Hiring"
          />
        </Grid>
        
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button
              variant="outlined"
              onClick={handleReset}
              sx={{ minWidth: 100 }}
            >
              Reset
            </Button>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<PostAddIcon />}
                sx={{ minWidth: 100 }}
              >
                Preview
              </Button>
              
              <Button
                type="submit"
                variant="contained"
                startIcon={<AddCircleOutlineIcon />}
                sx={{ minWidth: 100 }}
              >
                Create Post
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 4, p: 2, bgcolor: 'background.paper', borderRadius: 2, border: '1px dashed', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <HelpOutlineIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6">Tips for a Great Job Post</Typography>
        </Box>
        <Typography variant="body2" color="textSecondary">
          • Be specific about the role and responsibilities<br />
          • Clearly state required qualifications and experience<br />
          • Highlight your company culture and benefits<br />
          • Include salary information to attract qualified candidates<br />
          • Select relevant skills to help candidates understand requirements
        </Typography>
      </Box>
    </Box>
  );
};

export default function Home() {
  const [value, setValue] = React.useState('1');
  const [mode, setMode] = React.useState('light');
  const [notificationAnchorEl, setNotificationAnchorEl] = React.useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = React.useState(null);
  const [notifications, setNotifications] = React.useState(mockNotifications);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState('success');
  
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const handleThemeToggle = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    showSnackbar(`Switched to ${mode === 'light' ? 'dark' : 'light'} mode`, 'info');
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notif => ({ ...notif, read: true }))
    );
    handleNotificationMenuClose();
    showSnackbar('All notifications marked as read', 'success');
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleLogout = () => {
    showSnackbar('Successfully logged out', 'success');
    // Implement actual logout logic here
  };

  const unreadNotifications = notifications.filter(notif => !notif.read).length;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Fade in={true} timeout={800}>
          <Box sx={{ mt: 2 }}>
            <AppBar position="static" color="default" elevation={2} sx={{ borderRadius: 2 }}>
              <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <DashboardIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant='h5' fontWeight="bold" sx={{ color: theme.palette.primary.main }}>
                    EMPLOYER DASHBOARD
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
                    <IconButton onClick={handleThemeToggle} color="inherit">
                      {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                    </IconButton>
                  </Tooltip>
                  
                  <Tooltip title="Notifications">
                    <IconButton 
                      onClick={handleNotificationMenuOpen} 
                      color="inherit"
                      aria-label="notifications"
                    >
                      <Badge badgeContent={unreadNotifications} color="error">
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                  </Tooltip>
                  
                  <Menu
                    anchorEl={notificationAnchorEl}
                    open={Boolean(notificationAnchorEl)}
                    onClose={handleNotificationMenuClose}
                    PaperProps={{
                      elevation: 4,
                      sx: { width: 360, maxHeight: 270, mt: 1 }
                    }}
                  >
                    <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h6">Notifications</Typography>
                      <Button size="small" onClick={markAllNotificationsAsRead}>
                        Mark all as read
                      </Button>
                    </Box>
                    <Divider />
                    {notifications.length === 0 ? (
                      <Box sx={{ p: 2, textAlign: 'center' }}>
                        <Typography variant="body2" color="textSecondary">
                          No notifications
                        </Typography>
                      </Box>
                    ) : (
                      notifications.map((notification) => (
                        <Box 
                          key={notification.id}
                          sx={{ 
                            p: 2, 
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                            bgcolor: notification.read ? 'transparent' : 'action.hover'
                          }}
                        >
                          <Typography variant="body1">
                            {notification.message}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {notification.read ? 'Read' : 'Unread'}
                          </Typography>
                        </Box>
                      ))
                    )}
                  </Menu>
                  
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleProfileMenuOpen}
                      color="inherit"
                      aria-label="account settings"
                    >
                      <AccountCircleIcon />
                    </IconButton>
                  </Tooltip>
                  
                  <Menu
                    anchorEl={profileAnchorEl}
                    open={Boolean(profileAnchorEl)}
                    onClose={handleProfileMenuClose}
                    PaperProps={{
                      elevation: 4,
                      sx: { width: 240, mt: 1 }
                    }}
                  >
                    <Box sx={{ p: 2, textAlign: 'center' }}>
                      <AccountCircleIcon sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="h6">John Doe</Typography>
                      <Typography variant="body2" color="textSecondary">
                        john.doe@company.com
                      </Typography>
                    </Box>
                    <Divider />
                    <MenuItem onClick={handleProfileMenuClose}>
                      <ListItemIcon>
                        <AccountCircleIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Profile" />
                    </MenuItem>
                    <MenuItem onClick={handleProfileMenuClose}>
                      <ListItemIcon>
                        <SettingsIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Settings" />
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Logout" />
                    </MenuItem>
                  </Menu>
                  
                  <Button 
                    variant="contained" 
                    startIcon={<HomeIcon />} 
                    component={Link} 
                    to="/"
                    sx={{ 
                      borderRadius: 2,
                      boxShadow: 2,
                      '&:hover': {
                        boxShadow: 4,
                      }
                    }}
                  >
                    Home
                  </Button>
                </Box>
              </Toolbar>
            </AppBar>

            <Paper 
              elevation={3} 
              sx={{ 
                mt: 3, 
                borderRadius: 2,
                overflow: 'hidden'
              }}
            >
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
                  <TabList 
                    onChange={handleChange} 
                    aria-label="dashboard tabs"
                    variant="fullWidth"
                    TabIndicatorProps={{
                      sx: { height: 3, borderRadius: '3px 3px 0 0' }
                    }}
                  >
                    <Tab 
                      label="Create Post" 
                      value="1" 
                      icon={<AddCircleOutlineIcon />} 
                      iconPosition="start"
                      sx={{ py: 2 }}
                    />
                    <Tab 
                      label="My Posts" 
                      value="2" 
                      icon={<ListAltIcon />} 
                      iconPosition="start"
                      sx={{ py: 2 }}
                    />
                    <Tab 
                      label="Analytics" 
                      value="3" 
                      icon={<AnalyticsIcon />} 
                      iconPosition="start"
                      sx={{ py: 2 }}
                    />
                  </TabList>
                </Box>
                <TabPanel value="1" sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
                  <CustomJobPostForm showSnackbar={showSnackbar} />
                </TabPanel>
                <TabPanel value="2" sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h5" gutterBottom>My Job Posts</Typography>
                    <Typography variant="body1" color="textSecondary">
                      You haven't created any job posts yet. Create your first job post in the "Create Post" tab.
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<PostAddIcon />}
                      onClick={() => setValue('1')}
                      sx={{ mt: 2 }}
                    >
                      Create Your First Post
                    </Button>
                  </Box>
                </TabPanel>
                <TabPanel value="3" sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h5" gutterBottom>Analytics Dashboard</Typography>
                    <Typography variant="body1" color="textSecondary">
                      No analytics data available yet. Post jobs to start collecting data.
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<PostAddIcon />}
                      onClick={() => setValue('1')}
                      sx={{ mt: 2 }}
                    >
                      Create Job Post
                    </Button>
                  </Box>
                </TabPanel>
              </TabContext>
            </Paper>
          </Box>
        </Fade>
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
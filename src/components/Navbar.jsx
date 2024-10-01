// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom'; // Import for navigation
import { motion } from 'framer-motion';
import { auth } from '../firebase'; // Import your firebase auth instance
import { signOut, onAuthStateChanged } from 'firebase/auth';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  // Toggle Drawer
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  // Check authentication status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
    });
    return () => unsubscribe(); // Cleanup subscription
  }, []);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setLoggedIn(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Drawer content for mobile
  const drawerContent = (
    <Box
      sx={{ width: 250, color: 'black' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/blog">
          <ListItemText primary="Blog" />
        </ListItem>
        {loggedIn ? (
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        ) : (
          <ListItem button component={Link} to="/login">
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          boxShadow: 'none',
          color: 'black'
        }}>
        <Toolbar>

          {/* Navbar Title */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Blog in Nature
          </Typography>

          {/* Buttons for desktop view */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/blog">Blog</Button>
            <Button color="inherit" component={Link} to="/create">create</Button>
            {loggedIn ? (
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            ) : (
              <Button color="inherit" component={Link} to="/login">Login</Button>
            )}
          </Box>

          {/* Menu button for mobile */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: 'block', md: 'none' } }} // Visible only on mobile
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Navbar;

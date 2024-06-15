import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Button, Tabs, Tab } from "@mui/material";
import { useAuth } from '../contexts/AuthContext';
import { useSelector } from 'react-redux'; 

const Navbar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate(); 
  const productQuantities = useSelector(state => state.cart); 
  const totalQuantity = productQuantities.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser")
    localStorage.removeItem("cartItems")
    localStorage.removeItem("users")
    localStorage.removeItem("id")
    localStorage.removeItem("userData")
    logout();
    navigate('/'); 
  };

  return (
    <AppBar  sx={{ background: "black" }}>
      <Toolbar>
        <Typography variant="h3">My Online Shopping Site</Typography>
        <Box display="flex" marginLeft="auto" marginRight="auto">
          <Tabs>
            <Tab LinkComponent={Link} to="/products" style={{color:"white"}} label="Products" />
          </Tabs>
        </Box>
        <Box display="flex" marginLeft="auto">
          {user ? (
            <>
              <Button variant="contained" sx={{ margin: 1, borderRadius: 10 }} onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/" variant="contained" sx={{ margin: 1, borderRadius: 10 }} color="warning">
                Login
              </Button>
            </>
          )}
          <Button component={Link} to="/products" variant="outlined" sx={{ margin: 2 }} color="warning">
            MyCart ({totalQuantity})
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

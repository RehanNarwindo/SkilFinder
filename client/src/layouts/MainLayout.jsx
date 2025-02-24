import React from "react";
import { Box, AppBar, Toolbar, Typography, Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">My App</Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: 4 }}>
        <Outlet /> 
      </Container>
    </>
  );
};

export default MainLayout;

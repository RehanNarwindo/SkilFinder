import React from "react";
import { Box, Container, Typography, Paper } from "@mui/material";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f4f6f8">
      <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center" }}>
          <Outlet />
      </Container>
    </Box>
  );
};

export default AuthLayout;

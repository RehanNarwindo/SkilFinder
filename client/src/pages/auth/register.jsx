import React, { useState } from "react";
import { Box, Button, Card, CardContent, TextField, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { postRegister } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    role: "students",
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (form.password !== form.confirmPassword) {
      alert("Password dan Konfirmasi Password harus sama!");
      return;
    }

    const { confirmPassword, ...formData } = form; // Hapus confirmPassword sebelum dikirim
    dispatch(postRegister(formData));
    console.log("Register Data:", formData);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f4f6f8">
      <Card sx={{ width: 400, p: 3, borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Register
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Full Name"
              variant="outlined"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              variant="outlined"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              variant="outlined"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Confirm Password"
              variant="outlined"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
            {/* <FormControl fullWidth>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
              >
                <MenuItem value="Laki-laki">Laki-laki</MenuItem>
                <MenuItem value="Perempuan">Perempuan</MenuItem>
              </Select>
            </FormControl> */}

          <FormControl fullWidth>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="demo-simple-select"
              name="gender"
              value={form.gender}
              label="gender"
              onChange={handleChange}
              required
            >
              <MenuItem value="Laki-laki">Laki-laki</MenuItem>
              <MenuItem value="Perempuan">Perempuan</MenuItem>
            </Select>
          </FormControl>


            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
            {error && (
              <Typography color="error" align="center" mt={2}>
                Registration failed. Please try again.
              </Typography>
            )}
          </form>
          <Typography align="center" mt={2}>
          Already have an account?  
          <Button 
            component={Link} 
            to="/login" 
            sx={{ textTransform: "none", ml: 1 }}
          >
            go to login
          </Button>
        </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

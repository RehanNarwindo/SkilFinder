import { Container, Typography, Button } from "@mui/material";

function Home() {
  return (
    <Container>
      <Typography variant="h4" color="primary" gutterBottom>
        Welcome to My School App
      </Typography>
      <Typography variant="body1">
        Ini adalah contoh UI untuk aplikasi pendidikan menggunakan Material UI.
      </Typography>
      <Button variant="contained" color="primary">
        Get Started
      </Button>
    </Container>
  );
}

export default Home;

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Warna utama (biru default MUI)
    },
    secondary: {
      main: "#f50057", // Warna sekunder (merah muda)
    },
    background: {
      default: "#f4f4f4", // Warna latar belakang utama
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

export default theme;

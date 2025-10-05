import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import EmployeeManagement from './pages/EmployeeManagement.jsx';
import { createTheme, ThemeProvider, CssBaseline, Container, Box } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#a34700' },
    secondary: { main: '#5a2a82' },
    background: { default: '#121212', paper: '#ffffff' },
    text: { primary: '#f5f5f5', secondary: '#c7c7c7' }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '1.25rem',
          backgroundImage: 'none',
          color: '#1f1f1f'
        }
      }
    }
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppProvider>
        <BrowserRouter>
          <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <Container sx={{ flexGrow: 1, py: 3 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/employees" element={<EmployeeManagement />} />
              </Routes>
            </Container>
            <Footer />
          </Box>
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  </StrictMode>,
)

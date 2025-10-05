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
    primary: { main: '#34495e', light: '#5d6d7e', dark: '#25313d' },
    secondary: { main: '#ffb347', dark: '#e69118' },
    success: { main: '#2ecc71' },
    error: { main: '#e74c3c' },
    background: { default: '#12161c', paper: '#ffffff' },
    text: { primary: '#f5f7fa', secondary: '#c2c9d0' }
  },
  typography: {
    fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif'
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          padding: '1.25rem',
          backgroundImage: 'none',
          color: '#1f1f1f'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          background: 'linear-gradient(90deg,#25313d,#34495e)'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 500 }
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

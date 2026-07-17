import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LocaleProvider } from './context/LocaleContext';
import AppRoutes from './routes';

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ThemeProvider>
        <LocaleProvider>
          <AppRoutes />
        </LocaleProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

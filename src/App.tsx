import { ThemeProvider } from './context/ThemeContext';
import { LocaleProvider } from './context/LocaleContext';
import HomePage from './pages/HomePage';

function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <HomePage />
      </LocaleProvider>
    </ThemeProvider>
  );
}

export default App;

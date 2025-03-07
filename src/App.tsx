import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen bg-cream dark:bg-gray-900 text-gray-900 dark:text-cream">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-cream">
        Hello World
      </h1>
      <ThemeToggle />
    </div>
  );
}

export default App;

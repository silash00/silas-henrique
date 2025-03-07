import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import ProfileCard from './components/ProfileCard';

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
      <ProfileCard />
      <ThemeToggle className="absolute m-4 bottom-0 right-0" />
    </div>
  );
}

export default App;

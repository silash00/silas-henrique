import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-cream dark:bg-gray-900 text-gray-900 dark:text-cream">
        <Outlet />
        <ThemeToggle className="absolute m-4 bottom-0 right-0" />
      </div>
    </ThemeProvider>
  );
};

export default Layout;

import ThemeToggle from './components/ThemeToggle';
import LocaleToggle from './components/LocaleToggle';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-gray-900 dark:bg-gray-900 dark:text-cream">
      <Outlet />
      <div className="absolute bottom-0 right-0 z-50 m-4 flex flex-col items-end gap-3">
        <LocaleToggle />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Layout;

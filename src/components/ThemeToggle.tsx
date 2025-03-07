import { useTheme } from '../context/useTheme';
import { LuMoon, LuSun } from 'react-icons/lu';
import { Switch } from '@headlessui/react';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className={className}>
      <div
        onClick={toggleDarkMode}
        className="flex items-center space-x-2 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
      >
        <LuSun
          className={`h-[1.2rem] w-[1.2rem] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            isDarkMode
              ? 'text-[#A1A1AA] scale-75 rotate-12'
              : 'text-foreground scale-100 rotate-0'
          }`}
        />
        <Switch
          checked={isDarkMode}
          onChange={toggleDarkMode}
          aria-label="Toggle theme"
          className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-600 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 data-[checked]:bg-gray-400"
        >
          <span className="size-4 translate-x-1 rounded-full bg-cream transition group-data-[checked]:translate-x-6" />
        </Switch>

        <LuMoon
          className={`h-[1.2rem] w-[1.2rem] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            isDarkMode
              ? 'text-[#A1A1AA] scale-75 rotate-12'
              : 'text-foreground scale-100 rotate-0'
          }`}
        />
      </div>
    </div>
  );
}

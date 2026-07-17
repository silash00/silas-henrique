import { useEffect } from 'react';
import ThemeToggle from '../components/ThemeToggle';
import LocaleToggle from '../components/LocaleToggle';
import MemphisPop from '../components/lab/heroes/MemphisPop';
import MemphisMore from '../components/lab/MemphisMore';
import MemphisContact from '../components/lab/MemphisContact';

const FONT_HREFS = [
  'https://api.fontshare.com/v2/css?f[]=satoshi@1,400,500,700,900&display=swap',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
] as const;

export default function LabPage() {
  useEffect(() => {
    for (const href of FONT_HREFS) {
      if (document.querySelector(`link[href="${href}"]`)) continue;
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div className="lab-memphis min-h-dvh">
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
        <LocaleToggle />
        <ThemeToggle />
      </div>
      <MemphisPop />
      <MemphisMore />
      <MemphisContact />
    </div>
  );
}

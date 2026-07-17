import ThemeToggle from '../components/ThemeToggle';
import LocaleToggle from '../components/LocaleToggle';
import MemphisPop from '../components/memphis/MemphisPop';
import MemphisMore from '../components/memphis/MemphisMore';
import MemphisContact from '../components/memphis/MemphisContact';
import SeoJsonLd from '../components/memphis/SeoJsonLd';

export default function HomePage() {
  return (
    <div className="memphis min-h-dvh">
      <SeoJsonLd />
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
        <LocaleToggle />
        <ThemeToggle />
      </div>
      <main id="conteudo">
        <MemphisPop />
        <MemphisMore />
        <MemphisContact />
      </main>
    </div>
  );
}

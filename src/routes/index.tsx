import { lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from '../Layout';
import ProfileCard from '../components/ProfileCard';
import { AnimatePresence } from 'framer-motion';

const LabPage = lazy(() => import('../pages/LabPage'));

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProfileCard />} />
        </Route>
        <Route
          path="/lab"
          element={
            <Suspense
              fallback={
                <div className="grid min-h-dvh place-items-center bg-black font-mono text-sm text-white/60">
                  Loading lab…
                </div>
              }
            >
              <LabPage />
            </Suspense>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;

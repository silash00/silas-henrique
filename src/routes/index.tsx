import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

const LabPage = lazy(() => import('../pages/LabPage'));

const labFallback = (
  <div className="grid min-h-dvh place-items-center bg-[color:#141414] font-mono text-sm text-white/60">
    Loading…
  </div>
);

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <Suspense fallback={labFallback}>
              <LabPage />
            </Suspense>
          }
        />
        <Route path="/lab" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;

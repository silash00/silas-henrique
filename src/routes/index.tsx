import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from '../Layout';
import ProfileCard from '../components/ProfileCard';
import { AnimatePresence } from 'framer-motion';

const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProfileCard />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;

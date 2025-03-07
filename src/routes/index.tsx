import { Route, Routes } from 'react-router-dom';
import Layout from '../Layout';
import ProfileCard from '../components/ProfileCard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ProfileCard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const ProtectedLayout = ({ redirectPath = '/login' }) => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default ProtectedLayout;

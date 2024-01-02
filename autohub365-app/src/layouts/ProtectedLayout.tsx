import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useStore } from '../store/store';
import { useEffect } from 'react';

const ProtectedLayout = ({ redirectPath = '/login' }) => {
  const navigate = useNavigate();
  const { userToken, setUserToken } = useStore((state) => state);

  useEffect(() => {
    if (!userToken) {
      navigate(redirectPath);
    }
  });

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default ProtectedLayout;

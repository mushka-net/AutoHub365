import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import Layout from './layouts/Layout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import ProtectedLayout from './layouts/ProtectedLayout';
import Home from './pages/marketplace/Home';
import MyCars from './pages/marketplace/MyCars';
import Orders from './pages/marketplace/Orders';
import Profile from './pages/marketplace/Profile';
import AddCar from './pages/marketplace/AddCar';
import AllCars from './pages/marketplace/AllCars';
import FilteredCars from './pages/marketplace/FilteredCars';
import Car from './pages/marketplace/Car';

import { CssBaseline } from '@mui/material';

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    document.title = 'AutoHub365';
  });

  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<ProtectedLayout redirectPath="/login" />}>
            <Route path="*" element={<Navigate to="/home" />}></Route>
            <Route path="/home" element={<Home />} />
            <Route path="/my-cars" element={<MyCars />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/add-car" element={<AddCar />} />
            <Route path="/cars" element={<AllCars />} />
            <Route path="/filtered-cars" element={<FilteredCars />} />
            <Route path="/cars/:id" element={<Car />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

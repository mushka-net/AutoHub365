import { axiosPrivate } from '../lib/axios';

export const getOrdersBySeller = async (id: string) => {
  const response = await axiosPrivate.get(`/orders?seller=${id}`);
  return response;
};

export const getOrdersByBuyer = async (id: string) => {
  const response = await axiosPrivate.get(`/orders?buyer=${id}`);
  return response;
};

export const createOrder = async (car: string) => {
  const response = await axiosPrivate.post('/orders', {
    car,
  });
  return response;
};

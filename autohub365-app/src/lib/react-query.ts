import { useMutation } from 'react-query';
import { login, register, logout } from '../services/auth.service';
import { addCar, deleteCar } from '../services/cars.service';
import { CarValues, ProfileValues } from '../types';
import { updatePersonalInfo } from '../services/personal.service';
import { createOrder } from '../services/orders.service';

export const useRegisterMutation = () => {
  return useMutation((data: { username: string; password: string }) => {
    return register(data.username, data.password);
  });
};

export const useLoginMutation = () => {
  return useMutation((data: { username: string; password: string }) => {
    return login(data.username, data.password);
  });
};

export const useLogoutMutation = () => {
  return useMutation(() => {
    return logout();
  });
};

export const useAddCarMutation = () => {
  return useMutation((data: CarValues) => {
    return addCar(data);
  });
};

export const useDeleteCarMutation = () => {
  return useMutation((id: string) => {
    return deleteCar(id);
  });
};

export const useUpdatePersonalInfoMutation = () => {
  return useMutation(
    ({ id, personalInfo }: { id: string; personalInfo: ProfileValues }) => {
      return updatePersonalInfo(id, personalInfo);
    }
  );
};

export const useCreateOrderMutation = () => {
  return useMutation((car: string) => {
    return createOrder(car);
  });
};

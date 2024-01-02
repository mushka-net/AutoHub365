import { axiosPrivate } from '../lib/axios';
import { ProfileValues } from '../types';

export const getPersonalInfo = async (id: string) => {
  const response = await axiosPrivate.get(`/personal/${id}`);
  return {
    first_name: response.data.first_name,
    last_name: response.data.last_name,
    sex: response.data.sex,
    phone: response.data.phone,
    email: response.data.email,
    city: response.data.city,
    image: response.data.image,
  } as ProfileValues;
};

export const getUserAvatar = async (id: string) => {
  const response = await axiosPrivate.get(`/personal/${id}`);
  return response.data.image;
};

export const updatePersonalInfo = async (id: string, personalInfo: ProfileValues) => {
  const response = await axiosPrivate.put(`/personal/${id}`, personalInfo);
  return response;
};

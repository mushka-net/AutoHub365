import { axiosPrivate } from '../lib/axios';
import { ICar, CarValues } from '../types';

// user_id = StringField(required=True)
// brand = StringField(required=True)
// model = StringField(required=True)
// year = IntField(required=True)
// color = StringField(required=True)
// price = IntField(required=True)
// mileage = IntField(required=True)
// engine_capacity = FloatField(required=True)
// engine_type = StringField(required=True)
// transmission_type = StringField(required=True)
// description = StringField(required=True)
// image = StringField(required=True)
// is_sold = BooleanField(required=True)

export const getCars = async () => {
  const response = await axiosPrivate.get<ICar[]>('/cars');
  return response;
};

export const getCarsFiltered = async ({
  brand,
  model,
  year,
}: {
  brand: string | null;
  model: string | null;
  year: string | null;
}) => {
  const response = await axiosPrivate.get<ICar[]>('/cars', {
    params: {
      ...(brand ? { brand } : {}),
      ...(model ? { model } : {}),
      ...(year ? { year } : {}),
    },
  });
  return response;
};

export const getCarsByUserId = async (userId: string) => {
  const response = await axiosPrivate.get(`/cars?user_id=${userId}`);
  return response;
};

export const getCar = async (id: string) => {
  const response = await axiosPrivate.get<ICar>(`/cars/${id}`);
  return response;
};

export const addCar = async (car: CarValues) => {
  const form = new FormData();
  form.append('brand', car.brand);
  form.append('model', car.model);
  form.append('year', car.year.toString());
  form.append('color', car.color);
  form.append('price', car.price.toString());
  form.append('mileage', car.mileage.toString());
  form.append('engine_capacity', car.engine_capacity.toString());
  form.append('engine_type', car.engine_type);
  form.append('transmission_type', car.transmission_type);
  form.append('description', car.description);
  if (car.image_data) {
    form.append('image_data', car.image_data);
  }
  const response = await axiosPrivate.post('/cars', form);
  return response;
};

export const editCar = async (car: CarValues, id: string) => {
  const form = new FormData();
  form.append('brand', car.brand);
  form.append('model', car.model);
  form.append('year', car.year.toString());
  form.append('color', car.color);
  form.append('price', car.price.toString());
  form.append('mileage', car.mileage.toString());
  form.append('engine_capacity', car.engine_capacity.toString());
  form.append('engine_type', car.engine_type);
  form.append('transmission_type', car.transmission_type);
  form.append('description', car.description);
  if (car.image_data) {
    form.append('image_data', car.image_data);
  }
  const response = await axiosPrivate.put(`/cars/${id}`, form);
  return response;
};

export const deleteCar = async (id: string) => {
  const response = await axiosPrivate.delete(`/cars/${id}`);
  return response;
};

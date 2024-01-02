export interface ICar {
  id: string;
  user_id: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  price: number;
  mileage: number;
  engine_capacity: number;
  engine_type: string;
  transmission_type: string;
  description: string;
  image: string;
  is_sold: boolean;
}

export interface CarValues {
  brand: string;
  model: string;
  year: string;
  color: string;
  price: string;
  mileage: string;
  engine_capacity: string;
  engine_type: string;
  transmission_type: string;
  description: string;
  image_data: string;
}

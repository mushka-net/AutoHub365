import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CarDocument = HydratedDocument<Car>;

@Schema()
export class Car {
  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  engineCapacity: number;

  @Prop({ required: true })
  petrolType: string;

  @Prop({ required: true })
  mileage: number;

  @Prop({ required: true })
  transmissionType: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  image: Blob;
}

export const CarSchema = SchemaFactory.createForClass(Car);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as _schema } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  desc: string;
  @Prop({ required: true })
  img_path: string;
  @Prop({ required: true })
  stock: number;
  @Prop({ required: true })
  price: string;
  @Prop({ default: 0 })
  sold_quantity: number;
  @Prop({ default: 0 })
  click: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

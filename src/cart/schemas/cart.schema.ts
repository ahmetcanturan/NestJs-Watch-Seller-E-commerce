import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as _schema } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema()
export class Cart {
  @Prop({ unique: true, type: _schema.Types.ObjectId, ref: 'User' })
  userId: _schema.Types.ObjectId;
  @Prop([{ required: false, type: _schema.Types.ObjectId, ref: 'Product' }])
  products: _schema.Types.ObjectId[];
  @Prop({ default: 0 })
  totally: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);

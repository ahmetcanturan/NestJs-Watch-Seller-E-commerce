import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as _schema } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  surname: string;
  @Prop({ required: true, unique: true, trim: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({
    unique: true,
    type: _schema.Types.ObjectId,
    ref: 'Cart',
  })
  cartId: _schema.Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);

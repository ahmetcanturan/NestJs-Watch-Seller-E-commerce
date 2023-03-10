import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as _schema } from 'mongoose';

export type AdressDocument = Adress & Document;

@Schema()
export class Adress {
  @Prop({ unique: true, type: _schema.Types.ObjectId, ref: 'User' })
  userId: _schema.Types.ObjectId;
  @Prop({ required: true })
  country: string;
  @Prop({ required: true })
  city: string;
  @Prop({ required: true })
  adress: string;
  @Prop({ required: true })
  zipCode: number;
  @Prop({ required: true })
  tc: number;
  @Prop({ required: true })
  phone: string;
}

export const AdressSchema = SchemaFactory.createForClass(Adress);

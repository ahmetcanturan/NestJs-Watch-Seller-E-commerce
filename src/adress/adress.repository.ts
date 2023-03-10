import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, ObjectId } from 'mongoose';
import { Observable } from 'rxjs';
import { Adress, AdressDocument } from './schemas/adress.schema';
@Injectable()
export class AdressRepository {
  constructor(
    @InjectModel(Adress.name) private AdressModel: Model<AdressDocument>,
  ) {}

  async create(adress: Adress): Promise<AdressDocument> {
    const newAdress = new this.AdressModel(adress);
    return newAdress.save();
  }

  async findByUserId(userId: ObjectId): Promise<AdressDocument> {
    return this.AdressModel.findOne({ userId: userId });
  }
  async update(adress: Adress): Promise<AdressDocument> {
    return this.AdressModel.findOneAndUpdate({ userId: adress.userId }, adress);
  }
}

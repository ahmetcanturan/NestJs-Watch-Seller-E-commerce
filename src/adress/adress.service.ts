import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { AdressRepository } from './adress.repository';
import { Adress, AdressDocument } from './schemas/adress.schema';

@Injectable()
export class AdressService {
  constructor(private readonly adressRepository: AdressRepository) {}

  create(adress: Adress): Promise<AdressDocument> {
    return this.adressRepository.create(adress);
  }
  findByUserId(userId: ObjectId): Promise<AdressDocument> {
    return this.adressRepository.findByUserId(userId);
  }
  update(adress: Adress): Promise<AdressDocument> {
    return this.adressRepository.update(adress);
  }
}

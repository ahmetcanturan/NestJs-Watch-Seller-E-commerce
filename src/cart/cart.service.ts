import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { CartRepository } from './cart.repository';
import { Cart, CartDocument } from './schemas/cart.schema';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}

  async create(cart: Cart): Promise<CartDocument> {
    return this.cartRepository.create(cart);
  }

  async findById(id: ObjectId): Promise<CartDocument> {
    return this.cartRepository.findById(id);
  }
}

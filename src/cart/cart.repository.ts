import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, ObjectId } from 'mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
@Injectable()
export class CartRepository {
  constructor(@InjectModel(Cart.name) private CartModel: Model<CartDocument>) {}

  async findById(id: ObjectId): Promise<CartDocument> {
    return this.CartModel.findById(id);
  }
  async findByUserId(id: ObjectId): Promise<CartDocument> {
    return this.CartModel.findOne({ userId: id }).populate({
      path: 'products',
      select: ['name', 'price'],
    });
  }

  async create(cart: Cart): Promise<CartDocument> {
    const newCart = new this.CartModel(cart);
    return newCart.save();
  }
}

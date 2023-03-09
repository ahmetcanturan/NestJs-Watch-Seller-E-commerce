import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
@Injectable()
export class ProductsRepository {
  constructor(
    @InjectModel(Product.name) private ProductModel: Model<ProductDocument>,
  ) {}

  async findAll(): Promise<ProductDocument[]> {
    return this.ProductModel.find();
  }
  async findBestSeller(): Promise<ProductDocument[]> {
    let json = await this.ProductModel.find();
    json = json
      .sort((a, b) => (a.sold_quantity < b.sold_quantity ? 1 : -1))
      .slice(0, 3);
    return json;
  }
  async lastProducts(): Promise<ProductDocument[]> {
    let json = await this.ProductModel.find().sort({ $natural: -1 });
    json = json.slice(0, 3);
    return json;
  }

  async create(product: Product): Promise<ProductDocument> {
    const newUsers = new this.ProductModel(product);
    return newUsers.save();
  }
}

import { Injectable } from '@nestjs/common';
import { Product, ProductDocument } from './schemas/product.schema';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async findAll(): Promise<ProductDocument[]> {
    return this.productsRepository.findAll();
  }
  async findBestSeller(): Promise<ProductDocument[]> {
    return this.productsRepository.findBestSeller();
  }
  async lastProducts(): Promise<ProductDocument[]> {
    return this.productsRepository.lastProducts();
  }
  async create(product: Product): Promise<ProductDocument> {
    return this.productsRepository.create(product);
  }
}

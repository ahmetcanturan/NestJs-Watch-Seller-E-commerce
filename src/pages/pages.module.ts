import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsRepository } from 'src/products/products.repository';
import { ProductsService } from 'src/products/products.service';
import { Product, ProductSchema } from 'src/products/schemas/product.schema';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { UsersRepository } from 'src/users/users.repository';
import { UsersService } from 'src/users/users.service';
import { PagesController } from './pages.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [PagesController],
  providers: [
    ProductsService,
    ProductsRepository,
    UsersService,
    UsersRepository,
  ],
})
export class PagesModule {}

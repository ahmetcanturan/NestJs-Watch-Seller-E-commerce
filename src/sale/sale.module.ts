import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdressRepository } from 'src/adress/adress.repository';
import { AdressService } from 'src/adress/adress.service';
import { Adress, AdressSchema } from 'src/adress/schemas/adress.schema';
import { CartRepository } from 'src/cart/cart.repository';
import { CartService } from 'src/cart/cart.service';
import { Cart, CartSchema } from 'src/cart/schemas/cart.schema';
import { Product, ProductSchema } from 'src/products/schemas/product.schema';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { UsersRepository } from 'src/users/users.repository';
import { UsersService } from 'src/users/users.service';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
    MongooseModule.forFeature([{ name: Adress.name, schema: AdressSchema }]),
  ],
  controllers: [SaleController],
  providers: [
    SaleService,
    AdressService,
    AdressRepository,
    CartService,
    CartRepository,
    UsersService,
    UsersRepository,
  ],
})
export class SaleModule {}

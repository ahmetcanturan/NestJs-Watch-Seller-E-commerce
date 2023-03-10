import {
  Controller,
  Get,
  Redirect,
  Render,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { CartService } from 'src/cart/cart.service';
import { AdressFind } from 'src/guards/adress-find.guard';
import { UserIdentifierGuard } from 'src/guards/user-identifier.guard';
import { ProductsService } from 'src/products/products.service';

@Controller()
export class PagesController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly cartService: CartService,
  ) {}
  @Get()
  @Render('index')
  index() {}

  @Get('/about')
  @Render('about')
  about() {}

  @Get('/contact')
  @Render('contact')
  contact() {}
  @Get('/register')
  @Render('register')
  getRegister() {}

  @Get('/login')
  @Render('login')
  login() {}

  @Get('/logout')
  @Redirect('/login')
  logout(@Res() response: Response) {
    response.clearCookie('watch');
  }

  @Get('/adress/create')
  @UseGuards(UserIdentifierGuard)
  @UseGuards(AdressFind)
  @Render('adress_create')
  adress(@Req() req) {
    return { userId: req.findedUser._id };
  }

  @Get('/product/create')
  @Render('p_create')
  getProductCreate() {}

  @Get('/products')
  @Render('products')
  async products() {
    const bestSeller = await this.productsService.findBestSeller();
    const lastProducts = await this.productsService.lastProducts();
    const getAll = await this.productsService.findAll();
    return { bestSeller, lastProducts, getAll };
  }

  @UseGuards(UserIdentifierGuard) //* Buraya erişmek isteyen kullanıcının kimliğini tespit eder
  @Get('/cart')
  @Render('cart')
  async cart(@Req() req) {
    const cart = await this.cartService.cartFindOrCreatebyUserId(
      req.findedUser._id,
    );
    const totally = this.cartService.calculateCartTotally(cart.products);
    const amount = this.cartService.findSameProductsInCart(cart.products);

    return {
      products: cart.products,
      totally,
      id: req.findedUser._id,
      amount,
    };
  }
}

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
import { UserIdentifierGuard } from 'src/guards/user-identifier.guard';
import { ProductsService } from 'src/products/products.service';

@Controller()
export class PagesController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  @Render('index')
  index() {}

  @Get('/about')
  @Render('about')
  about() {}

  @Get('/contact')
  @Render('contact')
  contact() {}

  @Get('/products')
  @Render('products')
  async products() {
    const bestSeller = await this.productsService.findBestSeller();
    const lastProducts = await this.productsService.lastProducts();
    const getAll = await this.productsService.findAll();
    return { bestSeller, lastProducts, getAll };
  }

  @UseGuards(UserIdentifierGuard)
  @Get('/cart')
  @Render('cart')
  async cart(@Req() req) {
    console.log(req.findedUser);
    return { products: [], totally: 100 };
  }

  @Get('/login')
  @Render('login')
  login() {}

  @Get('/logout')
  @Redirect('/login')
  logout(@Res() response: Response) {
    response.clearCookie('watch');
  }

  @Get('/register')
  @Render('register')
  getRegister() {}

  @Get('/product/create')
  @Render('p_create')
  getProductCreate() {}
}

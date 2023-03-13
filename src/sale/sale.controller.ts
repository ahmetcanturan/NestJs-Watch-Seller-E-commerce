import { Controller, Post, Param, Req, Res, Render } from '@nestjs/common';
import { AdressService } from 'src/adress/adress.service';
import { CartService } from 'src/cart/cart.service';
import { UsersService } from 'src/users/users.service';
import { SaleService } from './sale.service';

@Controller('sale')
export class SaleController {
  constructor(
    private readonly saleService: SaleService,
    private readonly userService: UsersService,
    private readonly cartService: CartService,
    private readonly adressService: AdressService,
  ) {}

  @Post('/buy/:userId')
  async buy(@Param() param, @Req() req, @Res() res) {
    const user = await this.userService.findById(param.userId);
    const cart = await this.cartService.findByUserId(param.userId);
    const adress = await this.adressService.findByUserId(param.userId);
    const buyerProfile = this.saleService.buyerProfile(user, adress, req.ip);
    const totally = this.cartService.calculateCartTotally(cart.products);
    const cartProfile = this.saleService.cartProfile(cart, totally);
    const pay = await this.saleService.initializeCheckoutForm(
      buyerProfile,
      cartProfile,
    );
    res.redirect(pay.url);
  }

  @Post('/checkout/complete/payment')
  @Render('sale')
  async saleControl(@Req() req, @Res() res) {
    const json = await this.saleService.saleControl(req.body);
    if (json?.status !== 'success') {
      res.json(json);
    }
  }
}

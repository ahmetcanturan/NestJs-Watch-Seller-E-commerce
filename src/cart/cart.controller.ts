import {
  Controller,
  Param,
  Post,
  Redirect,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserIdentifierGuard } from 'src/guards/user-identifier.guard';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/create/:id')
  @UseGuards(UserIdentifierGuard)
  @Redirect('/cart')
  async addProduct(@Param() param, @Req() req) {
    await this.cartService.addProductWithUserIdAndProductId(
      req.findedUser._id,
      param.id,
    );
  }
}

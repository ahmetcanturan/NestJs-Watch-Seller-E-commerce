import { Body, Controller, Param, Post, Redirect } from '@nestjs/common';
import { AdressService } from './adress.service';

@Controller('adress')
export class AdressController {
  constructor(private readonly adressService: AdressService) {}

  @Post('/create/:id')
  @Redirect('/cart')
  async create(@Param() param, @Body() body) {
    body.userId = param.id;
    await this.adressService.create(body);
  }

  @Post('/update/:id')
  @Redirect('/cart')
  async update(@Param() param, @Body() body) {
    body.userId = param.id;
    await this.adressService.update(body);
  }
}

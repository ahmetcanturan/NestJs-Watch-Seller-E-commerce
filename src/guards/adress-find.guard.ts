import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AdressService } from 'src/adress/adress.service';

@Injectable()
export class AdressFind implements CanActivate {
  constructor(
    private reflector: Reflector,
    private adressService: AdressService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const data = {
      country: '',
      city: '',
      adress: '',
      zipCode: '',
      tc: '',
      phone: '',
    };
    response.locals.adress = data;
    response.locals.method = 'create';
    if (request?.detectedUser) {
      const adress = await this.adressService.findByUserId(
        request.detectedUser,
      );
      if (adress) {
        response.locals.adress = adress;
        response.locals.method = 'update';
      }
    }
    return true;
  }
}

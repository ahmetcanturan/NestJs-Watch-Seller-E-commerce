import { Controller, Get, Post, Request, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  // @UseGuards(AuthGuard('local')) //? AuthGuard('local') request.bodyden username ve passwordu alıp req.user'a yazar
  // @Post('login')
  // async login(@Request() req, @Res({ passthrough: true }) response) {
  //   const token = this.authService.loginWithCredentials(req.user);
  //   response.cookie('watch', (await token).access_token);
  //   return token;
  // }

  // @UseGuards(AuthGuard('jwt')) //? AutGuard('jwt') header üzerinden tokeni alır çözer req.user'a yazar onaylamazsa Unauthorized döner
  // @Get('user-info')
  // getUserInfo(@Request() req) {
  //   return req.user;
  // }
}

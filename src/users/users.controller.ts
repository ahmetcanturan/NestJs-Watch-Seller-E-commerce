import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Request,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';
import { JoiValidationPipe } from '../JoiValidationPipe';
import { CreateUserSchema } from './user.valid';
@Controller()
export class UsersController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @Redirect('/')
  async login(@Request() req, @Res({ passthrough: true }) response) {
    const token = this.authService.loginWithCredentials(req.user);
    response.cookie('watch', (await token).access_token);
  }

  @Post('/register')
  @UsePipes(new JoiValidationPipe(CreateUserSchema))
  @Redirect('/')
  async register(@Body() body) {
    return this.usersService.register(body);
  }
}

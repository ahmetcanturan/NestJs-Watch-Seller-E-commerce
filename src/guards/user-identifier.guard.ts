import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UserIdentifierGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
  ) {}
  async canActivate(
    //* Decorator eklediğimiz controller tetiklendiğinde çalışır
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request?.detectedUser) {
      const user = await this.usersService.findById(request.detectedUser);
      request.findedUser = user;
      return true;
    } else return false;
  }
}

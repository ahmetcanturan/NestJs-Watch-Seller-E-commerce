import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { verify } from 'jsonwebtoken';

@Injectable()
export class JwtCookieAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const jwt = request.cookies['watch'];
    if (!jwt) {
      response.locals.aut = 'false';
      return true;
    }
    try {
      const payload = verify(jwt, process.env.JWT_SECRET);
      if (payload) {
        response.locals.aut = 'true';
        request.detectedUser = payload.sub;
      }
      return true;
    } catch (err) {
      response.locals.aut = 'false';
      return true;
    }
  }
}

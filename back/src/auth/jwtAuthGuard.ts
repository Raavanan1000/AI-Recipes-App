import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  async canActivate(context) {
    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      return false;
    }

    const user = await this.usersService.findOne(request.user.sub);

    if (!user) {
      return false;
    }

    request.user = user;

    return true;
  }
}

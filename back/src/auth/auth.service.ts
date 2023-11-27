import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './loginDto/loginDto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<{
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    role: Role;
  }> {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const { password, ...result } = user;
        return result;
      } else {
        throw new UnauthorizedException(
          'Les informations de connexion sont incorrectes',
        );
      }
    }
    return null;
  }

  async login(user: LoginDto) {
    const validatedUser = await this.validateUser(user.email, user.password);

    if (validatedUser) {
      const payload = { sub: validatedUser.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException(
        'Les informations de connexion sont incorrectes',
      );
    }
  }
  async validateToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (e) {
      return null;
    }
  }

  async register(dto: CreateUserDto) {
    const user = await this.usersService.create(dto);
    return { ...user, access_token: this.jwtService.sign({ sub: user.id }) };
  }

  async getUserFrom(token: string) {
    const payload = this.jwtService.decode(token);
    if (typeof payload === 'string') {
      throw new Error();
    }
    const userId = payload['sub'] ?? '';
    return await this.usersService.findOne(userId);
  }
}

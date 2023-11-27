import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Patch,
  Query,
  UnprocessableEntityException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { LoggedInUser } from 'src/auth/decorator/user.decorator';
import { UsersInterceptor } from 'src/interceptor/users.interceptor';
import RoleGuard from 'src/roles/RoleGuard';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
@UseGuards(RoleGuard)
@UseInterceptors(UsersInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('current')
  findCurrentUser(@LoggedInUser() loggedInUser: User) {
    return loggedInUser;
  }

  @Patch('current')
  updateCurrentUser(
    @LoggedInUser() loggedInUser: User,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(loggedInUser.id, updateUserDto);
  }

  @Patch('current/edit-password')
  async editCurrentUserPassword(
    @LoggedInUser() loggedInUser: User,
    @Body() dto: UpdatePasswordDto,
  ) {
    let user = null;
    try {
      user = await this.usersService.changePassword(loggedInUser.id, dto);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException();
      }

      throw new UnprocessableEntityException();
    }

    return user;
  }
}

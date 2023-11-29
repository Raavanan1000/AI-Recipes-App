import { BadRequestException, Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async create(data: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const userData = {
      ...data,
      password: hashedPassword,
    };

    return this.prisma.user.create({
      data: userData,
    });
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        allergis: { push: data.allergy },
      },
    });
  }

  async changePassword(id: string, dto: UpdatePasswordDto) {
    const user = await this.prisma.user.findFirstOrThrow({
      where: {
        id: id,
      },
    });
    const newPasswordHash = await bcrypt.hash(dto.newPassword, 10);
    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new Error();
    }

    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: newPasswordHash,
      },
    });
  }
}

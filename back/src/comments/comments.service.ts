import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(user, createCommentDto: CreateCommentDto) {
    return await this.prisma.comments.create({
      data: {
        comment: createCommentDto.comment,
        recipeId: createCommentDto.recipeId,
        userId: user.id,
      },
    });
  }

  async findAll(recipeId: string) {
    return await this.prisma.comments.findMany({
      where: {
        recipeId,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.comments.delete({
      where: {
        id,
      },
    });
  }
}

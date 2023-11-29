import { ConflictException, Injectable } from '@nestjs/common';
import { string } from 'joi';
import { async } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavouritesService {
  constructor(private prisma: PrismaService) {}

  async create(recipeId: string, userId: string) {
    const recipe = await this.prisma.favouriteRecipe.findFirst({
      where: {
        userId: userId,
        recipeId: recipeId,
      },
      select: {
        recipe: true,
      },
    });

    if (recipe) {
      throw new ConflictException();
    }

    return this.prisma.favouriteRecipe.create({ data: { recipeId, userId } });
  }

  async findAllByUserId(id: string) {
    return this.prisma.favouriteRecipe.findMany({
      where: { userId: id },
      include: { recipe: true },
    });
  }

  remove(id: string) {
    return this.prisma.favouriteRecipe.delete({ where: { id } });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavouritesService {
  constructor(private prisma: PrismaService) {}

  create(recipeId: string, userId: string) {
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

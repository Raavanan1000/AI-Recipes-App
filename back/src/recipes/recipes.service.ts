import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  async searchRecipe(query: string) {
    return await this.prisma.recipe.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.recipe.findUnique({
      where: { id: id },
    });
  }

  searchByCurrentSeason() {
    return this.prisma.recipe.findMany({ take: 4 });
  }
}

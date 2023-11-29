import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OpenAI } from 'openai';

const openai = new OpenAI();
@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  async searchRecipe(user, query: string) {
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

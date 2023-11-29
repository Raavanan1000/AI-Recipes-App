import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OpenAI } from 'openai';

const openai = new OpenAI();

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  async searchRecipe(user, query: string) {
    let recommendedRecipes = [];

    const recipes = await this.prisma.recipe.findMany({
      select: {
        id: true,
        name: true,
        ingredients: true,
      },
      take: 28,
    });

    const userData: any = {};

    const prompt = `Here are some recipes from our database : ${JSON.stringify(
      recipes,
    )}.
    select the best recipe based the client's search query and return only an array of id's of the matching recipes : ${JSON.stringify(
      query,
    )}. the format of the response should be an array of id's like ["1", "2", "3"], if no recipes matches, return an empty array like [], the returned response from you should always be just an array either empty or not without any additional characters`;

    if (userData?.allergis?.length > 0) {
      const allergies =
        'the client is allergic to ' + userData.allergis.join(', ');
      prompt.concat(allergies);
    }

    let res;

    try {
      res = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: prompt,
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }

    if (res?.choices[0]?.message?.content) {
      let response = [];

      try {
        response = JSON.parse(res?.choices[0]?.message?.content || '[]');
      } catch {}

      if (Array.isArray(response) && response.length > 0) {
        recommendedRecipes = await this.prisma.recipe.findMany({
          where: {
            id: {
              in: response,
            },
          },
        });
      }
    }

    return recommendedRecipes;
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

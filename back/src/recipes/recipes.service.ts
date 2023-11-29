import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OpenAI } from 'openai';

const openai = new OpenAI();

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  async searchRecipe(user, query: string, considerAllergies: boolean) {
    let recommendedRecipes = [];

    console.log(considerAllergies);
    const recipes = await this.prisma.recipe.findMany({
      select: {
        id: true,
        name: true,
        ingredients: true,
      },
      take: 28,
    });

    const userData = await this.prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        allergis: true,
      },
    });

    const prompt = `Here are some recipes from our database : ${JSON.stringify(
      recipes,
    )}.
    select the best recipe based the client's search query and return only an array of id's of the matching recipes : ${JSON.stringify(
      query,
    )}. the format of the response should be an array of id's like ["1", "2", "3"], if no recipes matches, return an empty array like [], the returned response from you should always be just an array either empty or not without any additional characters`;

    if (considerAllergies && userData?.allergis?.length > 0) {
      const allergies =
        'take into account the allergies of the client, the client is allergic to ' +
        userData.allergis.join(', ');
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

    if (recommendedRecipes.length > 0) {
      recommendedRecipes = await Promise.all(
        recommendedRecipes.map(async (recipe) => {
          const favorite = await this.prisma.favouriteRecipe.findFirst({
            where: {
              userId: user.id,
              recipeId: recipe.id,
            },
          });

          return {
            ...recipe,
            favorite: !!favorite,
          };
        }),
      );
    }

    return recommendedRecipes;
  }

  async findOne(id: string) {
    return await this.prisma.recipe.findUnique({
      where: { id: id },
    });
  }

  async searchByCurrentSeason(userId: string, considerAllergies: boolean) {
    let recommendedRecipes = [];

    const recipes = await this.prisma.recipe.findMany({
      select: {
        id: true,
        name: true,
        ingredients: true,
      },
      take: 30,
    });

    const userData = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        allergis: true,
      },
    });

    const prompt = `Here are some recipes from our database : ${JSON.stringify(
      recipes,
    )}.
    select the best recipe based on ingredients seasonality (current season) and return only an array of id's of the matching recipes. the format of the response should be an array of id's like ["1", "2", "3"], if no recipes matches, return an empty array like [], the returned response from you should always be just an array either empty or not without any additional characters`;

    if (considerAllergies && userData?.allergis?.length > 0) {
      const allergies =
        'take into account the allergies of the client, the client is allergic to ' +
        userData.allergis.join(', ');
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
          take: 4,
        });
      }
    }

    if (recommendedRecipes.length > 0) {
      recommendedRecipes = await Promise.all(
        recommendedRecipes.map(async (recipe) => {
          const favorite = await this.prisma.favouriteRecipe.findFirst({
            where: {
              userId: userId,
              recipeId: recipe.id,
            },
          });

          return {
            ...recipe,
            favorite: !!favorite,
          };
        }),
      );
    }

    return recommendedRecipes;
  }

  async searchRecipeAccompaniments(recipeId: string) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id: recipeId },
    });

    if (!recipe) {
      return [];
    }

    const prompt = `from this recipe ingredients suggestes four accompaniments, here is the ingredients: ${JSON.stringify(
      recipe.ingredients.join(' , '),
    )}. the format of the response should be a json of accompaniments titles, if no accompaniments, return an empty array like [], the returned response from you should always be just an array either empty or not without any additional characters`;

    try {
      const res = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: prompt,
          },
        ],
      });

      return res?.choices[0]?.message?.content ?? [];
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { LoggedInUser } from 'src/auth/decorator/user.decorator';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  searchRecipe(@Body() body: { query: string }, @LoggedInUser() user) {
    const { query } = body;
    return this.recipesService.searchRecipe(user, query);
  }

  @Get('season')
  async searchByCurrentSeason() {
    return await this.recipesService.searchByCurrentSeason();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(id);
  }
}
